"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import the express module
var express = require("express");
//import the body-parser module
var bodyParser = require("body-parser");
//import the dotenev module
var dotenv = require("dotenv");
dotenv.config();
//import the cors module
var cors = require("cors");
//import all sub-modules
var GetAllBooks_1 = require("../modules/GetAllBooks");
var GetBooksIsbn_1 = require("../modules/GetBooksIsbn");
var GetBooksByAuthor_1 = require("../modules/GetBooksByAuthor");
var GetBooksByTitle_1 = require("../modules/GetBooksByTitle");
var GetBookReview_1 = require("../modules/GetBookReview");
var RegisterUser_1 = require("../modules/RegisterUser");
var LoginUser_1 = require("../modules/LoginUser");
var ReviewAdded_1 = require("../modules/ReviewAdded");
var DeleteReview_1 = require("../modules/DeleteReview");
//Create a REST object
var app = express();
//use the cors policy
app.use(cors());
//Use the body-parser to parse the json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//get the port number
var port = 4000;
//Use the submodules one by one on the rest object
app.use("/getBooks", GetAllBooks_1.default);
app.use("/getBookIsbn", GetBooksIsbn_1.default);
app.use("/getBookByAuthor", GetBooksByAuthor_1.default);
app.use("/getBooksByTitle", GetBooksByTitle_1.default);
app.use("/getBookReview", GetBookReview_1.default);
app.use("/register", RegisterUser_1.default);
app.use("/login", LoginUser_1.default);
app.use("/reviewAdded", ReviewAdded_1.default);
app.use("/deleteReview", DeleteReview_1.default);
//start listening the server at a port
app.listen(port, function () {
    console.log("Server is listening at port : ".concat(port));
});
