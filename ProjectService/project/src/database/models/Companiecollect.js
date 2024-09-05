const mongoose = require('mongoose');

const compagniecollectSchema = new mongoose.Schema({
    montant: { type: Number },
    objectivemontant: { type: String },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
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

compagniecollectSchema.pre('save', function (next) {
  
    const error = this.validateSync();
    if (error) {
        const err = new Error(error.message);
        err.status = 400; 
        return next(err);
    }

    next(); 
});

module.exports = mongoose.model('Compagniecollect', compagniecollectSchema);
