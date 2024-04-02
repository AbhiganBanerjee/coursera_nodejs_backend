//This module is used for registering a new user

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
const register:any = express.Router();

//Create a POST REST Service
register.post("/",async(req:any,res:any):Promise<any>=>{
    //Get the client and build DB Connection
    const client:any = new mongodb.MongoClient("mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority");

    try{
        //Get the database reference
        const db:any = client.db("coursera_nodejs");

        //Read the username and pwd from the request body passes as the form param
        const username:any = req.body.username;
        const password:any = req.body.password;

        //Insert the user in the user collection, for registration
        const result:any = await db.collection("users").insertOne({
            "username" : username,
            "password" : password
        });


        //Validate the result
        if(result.insertedId){
            res.status(200).json({"message" : "Customer Successfully registered. Now you can login"});
        }else{
            res.status(404).json({"Error" : "Error in Registering user!!"});
        }
    }catch(err){
        res.status(500).json({"Critical ERR":"Server Error!!!!"});
    }finally{
        client.close();
        res.end();
    }
});

//export the module
export default register;