
const mongoose = require('mongoose');

const DonSchema = new mongoose.Schema({
    userId: { type: String }, 
    compagneCollectId: { type: String },
    montant: { type: Number },  
    date: { type: Date, default: Date.now },  
},
{
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;      
        }
    },
    timestamps: true 
});

DonSchema.pre('save', function(next) {
    const error = this.validateSync();
    if (error) {
        const err = new Error(error.message);
        err.status = 400;
        return next(err);
    }
    next();
});

module.exports = mongoose.model('Don', DonSchema);