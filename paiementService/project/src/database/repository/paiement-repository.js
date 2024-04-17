
const {Don} = require("../models/index"); 

class PaiementRepository {
   
    async createPaiement(userId, compagneCollectId, montant) {
        try {
            // Assurez-vous que `montant` est un nombre valide
            montant = Number(montant);
            if (isNaN(montant) || montant <= 0) {
                throw new Error('Le montant doit être un nombre valide et positif');
            }

            const don = new Don({
                userId,
                compagneCollectId,
                montant,
            });
            await don.save();
            return don;
        } catch (error) {
            console.error('Erreur dans createPaiement :', error);
            throw error;
        }
    }

    // pdatePaiement, deletePaiement, etc., selon vos besoins
}

module.exports = PaiementRepository;
