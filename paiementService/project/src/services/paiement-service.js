const PaiementRepository = require("../database/repository/paiement-repository");

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
    

    
}

module.exports = PaiementService;