const {User} = require('./../models/user.model')
// const { Favorite} = require("../models/favorite.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode");


module.exports.register = (req, res)=>{
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY);            
            res
                .cookie("usertoken", userToken, {httpOnly: true})
                .json({msg: "success", user:user});
        })
        .catch(err => {
            console.log("in err")
            res.status(400).json(err)
        }); 
}

module.exports.cookie =(req, res)=>{
    res.cookie("test","test", {httpOnly:true}).json('usertoken')
}

module.exports.allUsers =(req, res)=>{
    User.find()
        .then(users=>res.cookie("test","test", {httpOnly:true}).json(users))
        .catch(err=>res.json(err))
}

module.exports.login = async(req, res)=>{
    const user = await User.findOne({ email: req.body.email });

    if(user === null) {
        return res.sendStatus(400);
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if(!correctPassword) {
        return res.sendStatus(400);
    }

    const userToken = jwt.sign({id: user._id}, process.env.SECRET_KEY);
    // console.log(user._id)

    res
        .cookie("usertoken", userToken, {httpOnly: true})
        .json({ msg: "success!" });
}




module.exports.logout = (req, res) =>{
    res.clearCookie('usertoken')
    res.sendStatus(200)
}

module.exports.findUser = (req,res) => {
    const id = req.params.id
    User.findOne({_id:id})
        .then(user => res.json(user))
        .catch(err=>res.status(400).json(err))
},

module.exports.updateUser = (req,res) => {
    const id = req.params.id
    User.findOneAndUpdate (
        {_id:id}, 
        req.body, 
        {new: true, runValidators:true}
    )
    .then(response => res.json(response))
    .catch(err=>res.status(400).json(err))
},

module.exports.deleteUser = (req,res) => {
    User.deleteOne ({_id:req.params.id})
        .then(response => res.json(response))
        .catch(err=>res.status(400).json(err))
}

// module.exports.getAllFavorites = (req, res) => {
//     Job.findOne({_id: req.params.userId}).populate('favorites')
//         .then(foundUser=>res.json(foundUser))
//         .catch(err=>res.status(400).json(err))
// }

module.exports.addFavorite = async(req, res) => {
    try{
        const newItem = await Item.findOne({id:req.body.itemId})
        console.log(newItem)
        
        const decoded = jwt_decode(req.cookies.userToken)
        const newUser = await User.findOne({_id:decoded.id})
        console.log(newUser)
        let favoriteIndex = -1;
        const {favorites} = newUser;

        for (let i = 0; i < favorites.length; i++) {
            if (newUser.favorites[i].equals(newItem)) {
                favoriteIndex = i;
                break;
            }
        }
        console.log(favoriteIndex);
        if(favoriteIndex === -1){
            await User.findOneAndUpdate({_id:decoded.id}, {$push: {favorites: newItem}}, {new: true})
        } 

        
        res.sendStatus(204)
    }catch(err){
        res.status(400).json(err)
    }

}