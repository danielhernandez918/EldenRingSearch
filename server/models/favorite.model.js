const mongoose = require('mongoose');
const Schema =mongoose.Schema

const FavoriteSchema = new Schema({
    id:{
        type: Number,
    },
    name:{
        type: String,
    }
},{timestamps: true})

module.exports.Favorite = mongoose.model('Favorite', FavoriteSchema)