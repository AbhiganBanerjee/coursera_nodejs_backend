//import the express module
import * as express from 'express';

//import the body-parser module
import * as bodyParser from 'body-parser';

//import the dotenev module
import * as dotenv from 'dotenv';
dotenv.config();

//import the cors module
import * as cors from 'cors';

//import all sub-modules
import getBooks from '../modules/GetAllBooks';
import getBookIsbn from '../modules/GetBooksIsbn';
import getByAuthor from '../modules/GetBooksByAuthor';
import getByTitle from '../modules/GetBooksByTitle';
import getBookReview from '../modules/GetBookReview';
import register from '../modules/RegisterUser';
import login from '../modules/LoginUser';
import reviewAdded from '../modules/ReviewAdded';
import delReview from '../modules/DeleteReview';

//Create a REST object
const app:any = express();

//use the cors policy
app.use(cors());

//Use the body-parser to parse the json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

//get the port number
const port:any = 4000;

//Use the submodules one by one on the rest object
app.use("/getBooks",getBooks);
app.use("/getBookIsbn",getBookIsbn)
app.use("/getBookByAuthor",getByAuthor)
app.use("/getBooksByTitle",getByTitle);
app.use("/getBookReview",getBookReview);
app.use("/register",register);
app.use("/login",login);
app.use("/reviewAdded",reviewAdded);
app.use("/deleteReview",delReview);

//start listening the server at a port
app.listen(port,():any=>{
    console.log(`Server is listening at port : ${port}`);
});