const fetch = require('node-fetch');
const { FLOUCI_SECRET } = require("../config");
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
                        success_link: "https://facebook.com",
                        fail_link: "https://gmail.com/",
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

    };
