const PaiementRepository = require("../database/repository/paiement-repository");
const { FormateData } = require("../utils");

class PaiementService {
    constructor() {
        this.repository = new PaiementRepository();
    }

    async createPaiement(userId, compagneCollectId, montant) {
        console.log('Montant reçu :', montant);
        console.log('Type de montant :', typeof montant);
    
        try {
            // Convertir montant en nombre si nécessaire
            montant = Number(montant);
            
            // Vérifier que montant est un nombre valide et positif
            if (isNaN(montant) || montant <= 0) {
                throw new Error('Le montant doit être un nombre valide et positif');
            }
            
            // Créer le paiement
            const paiement = await this.repository.createPaiement(userId, compagneCollectId, montant);
            return paiement;
        } catch (error) {
            console.error('Erreur dans createPaiement :', error);
            throw error;
        }
    }
    

    async createDonMateriel(userId, compagneCollectId, nom, prenom, email, telephone, materiel, message) {
        try {
            const donMateriel = await this.repository.createDonMateriel(userId, compagneCollectId, nom, prenom, email, telephone, materiel, message);
            return donMateriel;
        } catch (error) {
            console.error('Erreur dans createDonMateriel :', error);
            throw error;
        }
    }
    async getAllDonMateriel() {
        try {
            const donsMateriel = await this.repository.getAllDonMateriel();
            return FormateData(donsMateriel);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteDonMateriel(donMaterielId) {
        try {
            const deletedDonMateriel = await this.repository.deleteDonMateriel(donMaterielId);
            return FormateData(deletedDonMateriel);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    
}

module.exports = PaiementService;