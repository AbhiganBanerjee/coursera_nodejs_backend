//This module is used for getting all list of books present in my shop

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
const getBooks:any = express.Router();

//Create a GET REST Service
getBooks.get("/",async(req:any,res:any):Promise<any>=>{
    //Get the client and build DB Connection
    const client:any = new mongodb.MongoClient("mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority");

    try{
        //Get the database reference
        const db:any = client.db("coursera_nodejs");

        //find() operation
        const books:any = await db.collection("books").find({}).toArray();

        if(books.length > 0){
            res.status(200).json(books);
        }else{
            res.status(404).json({"Error" : "Error in fetching books!!"});
        }
    }catch(err){
        res.status(500).json({"Critical ERR":"Server Error!!!!"});
    }finally{
        client.close();
        res.end();
    }
});

//export the module
export default getBooks;