const express = require("express");
const cors = require('cors')
const app = express();
const port = 8000;
require('dotenv').config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("./config/mongoose.config");

app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))


require('./routes/user.routes')(app)

app.listen( port, () => console.log(`Listening on port: ${port}`) );

