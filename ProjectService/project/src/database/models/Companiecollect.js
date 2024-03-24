const mongoose = require('mongoose');

const companiecollectSchema = new mongoose.Schema({
    montant: { type: Number },
    objectivemontant: { type: String },
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

companiecollectSchema.pre('save', function (next) {
  
    const error = this.validateSync();
    if (error) {
        const err = new Error(error.message);
        err.status = 400; 
        return next(err);
    }

    next(); 
});

module.exports = mongoose.model('Companiecollect', companiecollectSchema);
