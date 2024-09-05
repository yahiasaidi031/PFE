const mongoose = require('mongoose');

const DonMaterielSchema = new mongoose.Schema({
    userId: { type: String },
    compagneCollectId: { type: String },
    nom: { type: String},
    prenom: { type: String },
    email: { type: String },
    telephone: { type: String },
    materiel: { type: String},
    message: { type: String }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v; 
        }
    },
    timestamps: true 
});

DonMaterielSchema.pre('save', function(next) {
    const error = this.validateSync();
    if (error) {
        const err = new Error(error.message);
        err.status = 400;
        return next(err);
    }
    next();
});

module.exports = mongoose.model('DonMateriel', DonMaterielSchema);
