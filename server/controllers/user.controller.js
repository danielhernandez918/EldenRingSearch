const {User} = require('./../models/user.model')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.register = (req, res)=>{
    User.create(req.body)
        .then(user => {
            // used to generate a JSON Web Token (JWT) based on a given payload and secret key.
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

    // used to generate a JSON Web Token (JWT) based on a given payload and secret key.
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

module.exports.findById = async (userId)=> {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error(`Could not find user with ID ${userId}`);
    }
},

module.exports.getUserData = async (req, res) => {
    try {
      // Get the user ID from the request object (set by the authMiddleware)
        const userId = req.userId;

        // Find the user in the database based on their ID
        const user = await User.findById(userId);

        // Return the user data
        res.json({             
            id: user._id,
            email: user.email,
            userName: user.userName,
            favorites: user.favorites
            });
    } catch (err) {
        // If there is an error, return a 401 Unauthorized status code
        res.sendStatus(401);
    }
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

module.exports.getAllFavorites = (req, res) => {
    Job.findOne({_id: req.params.userId}).populate('favorites')
        .then(foundUser=>res.json(foundUser))
        .catch(err=>res.status(400).json(err))
}

module.exports.addFavoriteItem = async (req, res) => {
    try {
        const userId = req.userId;
        const itemId = req.body.name;
        // console.log(itemId)
        // console.log(userId);
        const user = await User.findById(userId);
        if (!user) {
            return res.sendStatus(401);
        }
        // console.log(user);
        // Check if item is already in favorites
        const isFavorite = user.favorites.find((item) => item.toString() === itemId);
        if (isFavorite) {
            return res.sendStatus(200);
        }

        // Add item to favorites
        // const newFavorite = mongoose.Types.ObjectId();
        // console.log(newFavorite)
        user.favorites.push(itemId);
        await user.save();
    
        res.sendStatus(200);
        } catch (err) {
        console.log(err);
        res.sendStatus(500);
        }
};


module.exports.removeFavorite = async (userId, itemId) => {
    // Find the user document by ID and update its favorites array
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { favorites: itemId } },
        { new: true }
    );

    return updatedUser;
}

module.exports.deleteFavorite = async (req, res) => {
    try {
        const userId = req.userId; // get the ID of the logged-in user from the request object
        const itemId = req.body.itemId; // get the ID of the item to remove from the request body
                console.log(itemId)
            console.log(userId);
        const user = await User.findById(userId);
        if (!user) {
                return res.sendStatus(401);
        }
        const updatedUser = await module.exports.removeFavorite(userId, itemId);
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
    
}