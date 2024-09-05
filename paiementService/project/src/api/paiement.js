const fetch = require('node-fetch');
const { FLOUCI_SECRET,YOUR_API_KEY,YOUR_WALLET_ID } = require("../config");
const PaiementService = require("../services/paiement-service");
const { PublishMessage, SubscribeMessage } = require("../utils");
const{PAIMENT_BINDING_KEY,USER_BINDING_KEY} = require("../config/index")



module.exports = (app, channel) => {
    const paiementService = new PaiementService();
   
    app.post('/paiement', async (req, res) => {


        const { userId, compagneCollectId, montant } = req.body;

          // Validate inputs
    if (typeof userId !== 'string' || typeof compagneCollectId !== 'string' || typeof montant !== 'number') {
        return res.status(400).json({ error: 'Invalid input data types.' });
    }

    try {
        // Check if montant is a valid number
        if (isNaN(montant)) {
            throw new Error('Montant must be a valid number.');
        }

            // Appel à l'API Flouci pour générer un paiement
            const flouciPaymentResponse = await fetch(
                "https://developers.flouci.com/api/generate_payment",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        app_token: "0c4d5897-2bf9-49fa-a3c6-4a1d948eafb2",
                        app_secret: FLOUCI_SECRET,
                        amount: montant,
                        accept_card: true,
                        session_timeout_secs: 1200,
                        success_link: "http://localhost:4200/dashboard",
                        fail_link: "http://localhost:4200/dashboard",
                        developer_tracking_id: '1d8bb7df-afd2-4314-9db0-07546381b9a0'
                    })
                }
            );

            // Vérification de la réponse de l'API Flouci
            if (!flouciPaymentResponse.ok) {
                const responseText = await flouciPaymentResponse.text();
                throw new Error(`Erreur lors de l'initialisation du paiement Flouci : ${flouciPaymentResponse.status} - ${responseText}`);
            }

            // Récupération des données de la réponse de Flouci
            const flouciPaymentData = await flouciPaymentResponse.json();

            // Création du paiement local
            const paiement = await paiementService.createPaiement(userId, compagneCollectId, montant);

            // Publier le message à RabbitMQ
            const message = JSON.stringify({ userId, compagneCollectId, montant });
            PublishMessage(channel, PAIMENT_BINDING_KEY, message);
            PublishMessage(channel, USER_BINDING_KEY, message)

            res.status(200).json({
                message: 'Paiement effectué avec succès via Flouci.',
                flouciData: flouciPaymentData,
                userId,
                compagneCollectId,
                montant,
            });
        } catch (error) {
            console.error('Erreur lors de la création du paiement :', error);
            res.status(500).json({ error: `Erreur lors de la création du paiement : ${error.message}` });
        }
    });

    app.post('/payements/init-payment', async (req, res) => {
        const { userId, compagneCollectId, montant } = req.body;

        // Validate inputs
        if (typeof userId !== 'string' || typeof compagneCollectId !== 'string' || typeof montant !== 'number') {
            return res.status(400).json({ error: 'Invalid input data types.' });
        }

        try {
            // Check if montant is a valid number
            if (isNaN(montant)) {
                throw new Error('Montant must be a valid number.');
            }

            // Appel à l'API Konnect pour générer un paiement
            const konnectPaymentResponse = await fetch(
                "https://api.konnect.network/api/v2/payments/init-payment",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": YOUR_API_KEY
                    },
                    body: JSON.stringify({
                        receiverWalletId: YOUR_WALLET_ID,
                        amount: montant,
                        token: "TND"
                    })
                }
            );

            // Vérification de la réponse de l'API Konnect
            if (!konnectPaymentResponse.ok) {
                const responseText = await konnectPaymentResponse.text();
                throw new Error(`Erreur lors de l'initialisation du paiement Konnect : ${konnectPaymentResponse.status} - ${responseText}`);
            }

            // Récupération des données de la réponse de Konnect
            const konnectPaymentData = await konnectPaymentResponse.json();

            // Création du paiement local
            const paiement = await paiementService.createPaiement(userId, compagneCollectId, montant);

            // Publier le message à RabbitMQ
            const message = JSON.stringify({ userId, compagneCollectId, montant });
            PublishMessage(channel, PAIMENT_BINDING_KEY, message);
            PublishMessage(channel, USER_BINDING_KEY, message);

            res.status(200).json({
                message: 'Paiement effectué avec succès via Konnect.',
                konnectData: konnectPaymentData,
                userId,
                compagneCollectId,
                montant,
            });
        } catch (error) {
            console.error('Erreur lors de la création du paiement :', error);
            res.status(500).json({ error: `Erreur lors de la création du paiement : ${error.message}` });
        }
    });

    app.post('/don/material', async (req, res) => {
        const { userId, compagneCollectId, nom, prenom, email, telephone, materiel,message } = req.body;

        try {
            // Créer le don de matériel
            const donMateriel = await paiementService.createDonMateriel(userId, compagneCollectId, nom, prenom, email, telephone, materiel, message);

            // Publier le message à RabbitMQ
            const ms = JSON.stringify({ userId, compagneCollectId, nom, prenom, email, telephone, materiel, message });
            PublishMessage(channel, PAIMENT_BINDING_KEY, ms);

            res.status(200).json({
                message: 'Don de matériel créé avec succès.',
                donMateriel,
            });
        } catch (error) {
            console.error('Erreur lors de la création du don de matériel :', error);
            res.status(500).json({ error: `Erreur lors de la création du don de matériel : ${error.message}` });
        }
    });


    app.get('/allmaterial', async (req, res) => {
        try {
            const donsMateriel = await paiementService.getAllDonMateriel();
            return res.json(donsMateriel);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    app.delete('/don/material/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const deletedDonMateriel = await paiementService.deleteDonMateriel(id);
            return res.json(deletedDonMateriel);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });


    };
