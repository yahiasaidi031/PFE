const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    title: { type: String, required:true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    objective: { type: String },
    tags: { type: Schema.Types.ObjectId, ref: 'Tags' },
    image: { type: String, },
    avancements: [{ type: Schema.Types.ObjectId, ref: 'Avancement' }],
    compagniecollect: [{type: Schema.Types.ObjectId, ref: 'Compagniecollect' }],
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

projectSchema.pre('save', function (next) {
  
    const error = this.validateSync();
    if (error) {
        const err = new Error(error.message);
        err.status = 400; 
        return next(err);
    }

    next(); 
});

module.exports = mongoose.model('Project', projectSchema);
