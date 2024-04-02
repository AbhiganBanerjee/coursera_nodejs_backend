//This module is used for getting all list of books based on author name

//import the express module
import * as express from 'express';

//import the mongodb module
import * as mongodb from 'mongodb';

//Create this as a sub-module
const getByAuthor:any = express.Router();

//Create a GET REST Service
getByAuthor.get("/",async(req:any,res:any):Promise<any>=>{
    //Get the client and build DB Connection
    const client:any = new mongodb.MongoClient("mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority");

    try{
        //Get the database reference
        const db:any = client.db("coursera_nodejs");

        //Read author passed as the query param
        const author:any = req.query.author;

        //find() operation
        const books:any = await db.collection("books").find({"author":author}).toArray();

        if(books.length > 0){
            res.status(200).json(books);
        }else{
            res.status(404).json({"Error" : "Error in fetching book!!"});
        }
    }catch(err){
        res.status(500).json({"Critical ERR":"Server Error!!!!"});
    }finally{
        client.close();
        res.end();
    }
});

//export the module
export default getByAuthor;