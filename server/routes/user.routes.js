const UserController = require("../controllers/user.controller")
const FavoriteController = require("../controllers/favorite.controller")
const {authenticate} = require('../config/jwt.config')


module.exports = app =>{
    app.get(`/api/allUsers`, UserController.allUsers)
    app.get(`/api/cookie`, authenticate, UserController.cookie)
    app.post(`/api/register`, UserController.register)
    app.get(`/api/allUsers/:id`, UserController.findUser)
    app.put(`/api/allUsers/:id`, UserController.updateUser)
    app.delete(`/api/allUsers/:id`, UserController.deleteUser)
    app.post(`/api/login`, UserController.login)
    app.get(`/api/logout`, authenticate, UserController.logout)

    //route to get users favorites
    app.get(`/api/favorites/:userId`, authenticate, FavoriteController.favoritesOfOneUser)
    app.post(`/api/favorites`, authenticate, FavoriteController.addFavorite)
    // app.get("/api/favorites", FavoriteController.allFavorites)
    // app.delete("/api/favorites", UserController.addFavorite)
    // app.put("/api/favorites", UserController.addFavorite)
}