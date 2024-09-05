const { required } = require('joi');
const mongoose = require('mongoose');

const AvancementSchema = new mongoose.Schema({ 
    title: { type: String },
    description: { type: String},
    image: { type: String },
    video: { type: String},
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project'}
    
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

AvancementSchema.pre('save', function (next) {
  
    const error = this.validateSync();
    if (error) {
        const err = new Error(error.message);
        err.status = 400; 
        return next(err);
    }

    next(); 
});

module.exports = mongoose.model('Avancement', AvancementSchema);
