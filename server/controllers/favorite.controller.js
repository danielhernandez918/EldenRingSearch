const { Favorite} = require("../models/favorite.model")
const { User } = require("../models/user.model")
const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode");

// module.exports.allFavorites = (req, res) => {
//     Favorite.find()
//         .then(favorites=>res.json(favorites))
//         .catch(err=>res.status(400).json(err))
// }


// get all favorites of a user
module.exports.favoritesOfOneUser = (req, res) => {
    Favorite.find({user: req.params.userId})
        .then(favorites=>res.json(favorites))
        .catch(err=>res.status(400).json(err))
}

// add a favorite
module.exports.addFavorite = async(req, res) => {
    try{
        const newFavorite = new Favorite(req.body)

        // const decoded = jwt_decode(req.cookies.userToken)
        // const newUser = await User.findOne({_id:decoded.id})


        newFavorite.user = req.params.userId
        await newFavorite.save()
    
        const decoded = jwt_decode(req.cookies.userToken)
        const user = await User.findOne({_id:decoded.id})
        console.log(user)
        // const user = await User.findOne({_id:req.params.userId})
        user.favorites.push(newFavorite)
        await user.save()
        
        res.json(newFavorite)
    }catch(err){
        res.status(400).json(err)
    }
}