const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({
    userName: {
        type:String,
        required: [true, "Username is required"],
        minlength: [2, "User Name must be at least 2 characters"]
    },
    email: {
        type:String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type:String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },
    favorites:[{
        type: String,
        ref: 'Favorite'
    }]
},{timestamps : true});

// UserSchema.virtual('confirmPassword')
//     .get( () => this._confirmPassword )
//     .set( value => this._confirmPassword = value );

// UserSchema.pre('validate', function(next) {
//     if (this.password !== this.confirmPassword) {
//         this.invalidate('confirmPassword', 'Password must match confirm password');
//     }
//     next();
// });

UserSchema.pre('validate', function(next) {
    if (this.isNew) { // Check if user is new
        if (!this.password) {
            // If password is not set, then create a validation error
            this.invalidate('password', 'Password is required');
        }

        if (this.password !== this.confirmPassword) {
            this.invalidate('confirmPassword', 'Password must match confirm password');
        }
    }

    next();
});


UserSchema.pre('save', function (next) {
    const user = this;

    // Only run the match validator if the password field is present
    if (!user.isModified('password')) {
    return next();
    }

    bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) {
        return next(err);
    }

    user.password = hash;
    next();
    });
});


module.exports.User = mongoose.model('User', UserSchema)