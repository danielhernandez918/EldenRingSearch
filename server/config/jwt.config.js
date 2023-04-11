
// const jwt = require("jsonwebtoken");
    

// module.exports.authenticate = (req, res, next) => {
//     jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
//         if (err) { 
//         res.status(401).json({verified: false});
//         } else {
//         console.log(payload.id)
//         next();
//         }
//     });
// }

const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
  // Get the user token from the request cookies
    const userToken = req.cookies.usertoken;

    if (!userToken) {
        // If there is no user token, return a 401 Unauthorized status code
        return res.sendStatus(401);
    }

    try {
        // Verify the user token
        const decodedToken = jwt.verify(userToken, process.env.SECRET_KEY);

        // Set the user ID on the request object for use in subsequent middleware/controllers
        req.userId = decodedToken.id;

        // Call the next middleware/controller
        next();
    } catch (err) {
        // If the token is invalid, return a 401 Unauthorized status code
        res.sendStatus(401);
    }
};