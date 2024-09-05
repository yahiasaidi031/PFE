
const {Don,DonM} = require("../models/index"); 

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

    async createDonMateriel(userId, compagneCollectId, nom, prenom, email, telephone, materiel, message) {
        try {
            const donMateriel = new DonM({
                userId,
                compagneCollectId,
                nom,
                prenom,
                email,
                telephone,
                materiel,
                message,
            });
            await donMateriel.save();
            return donMateriel;
        } catch (error) {
            console.error('Erreur dans create DonMateriel :', error);
            throw error;
        }
    }



    async getAllDonMateriel() {
        try {
            const donsMateriel = await DonM.find();
            return donsMateriel;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteDonMateriel(donMaterielId) {
        try {
            const deletedDonMateriel = await DonM.findByIdAndDelete(donMaterielId);
            if (!deletedDonMateriel) {
                throw new Error("Don de matériel non trouvé");
            }
            return deletedDonMateriel;
        } catch (error) {
            throw new Error(error.message);
        }
    }





}

module.exports = PaiementRepository;
