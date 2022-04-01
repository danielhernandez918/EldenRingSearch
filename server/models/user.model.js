const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

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
        type: Schema.Types.ObjectId,
        ref: 'Favorite'
    }]
},{timestamps : true});

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
});


module.exports.User = mongoose.model('User', UserSchema)