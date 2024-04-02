//import the express module
import * as express from 'express';

//import the dotenv
import * as dotenv from 'dotenv';
dotenv.config();

//import the mongodb module
import * as mongodb from 'mongodb';

//get the mongo url
const url:any = process.env.MONGO_URI;

//Create this as a sub-module
const login:any = express.Router();

//Create a POST REST Service
login.post("/",async(req:any,res:any):Promise<any>=>{
    //Get the client and build DB Connection
    const client:any = new mongodb.MongoClient("mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority");

    try{
        //Get the database reference
        const db:any = client.db("coursera_nodejs");

        //Read the username and pwd from the request body passes as the form param
        const username:any = req.body.username;
        const password:any = req.body.password;

        //Check if the user exists in the database
        const user:any = await db.collection("users").findOne({
            "username" : username,
            "password" : password
        });

        //Validate the user
        if(user){
            res.status(200).json({"message" : "Customer Successfully Logged in"});
        }else{
            res.status(401).json({"Error" : "Invalid credentials. Please check your username and password."});
        }
    }catch(err){
        res.status(500).json({"Critical ERR":"Server Error!!!!"});
    }finally{
        client.close();
        res.end();
    }
});

//export the module
export default login;
