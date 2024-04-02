//This module is used for getting book review

//import the express module
import * as express from 'express';

//import the mongodb module
import * as mongodb from 'mongodb';

//Create this as a sub-module
const getBookReview:any = express.Router();

//Create a GET REST Service
getBookReview.get("/",async(req:any,res:any):Promise<any>=>{
    //Get the client and build DB Connection
    const client:any = new mongodb.MongoClient("mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority");

    try{
        //Get the database reference
        const db:any = client.db("coursera_nodejs");

        //find() operation
        const books:any = await db.collection("books").find({}).toArray();

        if(books.length > 0){
            res.status(200).json(books[0].reviews);
        }else{
            res.status(404).json({"Error" : "Error in fetching book review!!"});
        }
    }catch(err){
        res.status(500).json({"Critical ERR":"Server Error!!!!"});
    }finally{
        client.close();
        res.end();
    }
});

//export the module
export default getBookReview;