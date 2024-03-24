const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true }, 
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEnterprise: { type: Boolean },
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
    
    },
    companyName: { type: String },
    companyRegistrationNumber: { type: String },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true 
});

userSchema.pre('save', function (next) {
  
    const error = this.validateSync();
    if (error) {
        const err = new Error(error.message);
        err.status = 400; 
        return next(err);
    }

    next(); 
});

module.exports = mongoose.model('user', userSchema);
