const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String }, 
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEnterprise: { type: Boolean, default:'false' },
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin','responsable'],
        default: 'user'
    },
    companyName: { type: String },
    companyRegistrationNumber: { type: String },
    isBlocked: { type: Boolean, default: false } ,
},
 {
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

module.exports = mongoose.model('User', userSchema);
