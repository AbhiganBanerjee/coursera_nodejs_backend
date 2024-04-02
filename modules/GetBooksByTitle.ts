//This module is used for getting all list of books based on title

//import the express module
import * as express from 'express';

//import the mongodb module
import * as mongodb from 'mongodb';

//Create this as a sub-module
const getByTitle:any = express.Router();

//Create a GET REST Service
getByTitle.get("/",async(req:any,res:any):Promise<any>=>{
    //Get the client and build DB Connection
    const client:any = new mongodb.MongoClient("mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority");

    try{
        //Get the database reference
        const db:any = client.db("coursera_nodejs");

        //Read title passed as the query param
        const title:any = req.query.title;

        //find() operation
        const books:any = await db.collection("books").find({"title":title}).toArray();

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
export default getByTitle;