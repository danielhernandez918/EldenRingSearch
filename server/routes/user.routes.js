const UserController = require("../controllers/user.controller")
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
    app.get('/api/loggedUser', authenticate, UserController.getUserData)

    //route to get users favorites
    // app.get(`/api/users/favorites`, authenticate, UserController.favoritesOfOneUser)
    app.post(`/api/users/favorites`, authenticate, UserController.addFavoriteItem)
    app.delete("/api/users/favorites", authenticate, UserController.deleteFavorite)
    // app.put("/api/users/favorites", authenticate, UserController.updateFavorite)
}