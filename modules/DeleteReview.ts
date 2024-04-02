//This module is used to delete a book review

//import the express module
import * as express from "express";

//import the mongodb 
import * as mongodb from 'mongodb';

//Create this as a sub-module
const delReview:any = express.Router();

//Create a DELETE REST service to modify book review
delReview.delete("/",async (req:any,res:any):Promise<any>=>{
    //get the client and build connection
    const client:any = new mongodb.MongoClient("mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority");

    try{
        //Get the db reference
        const db:any = client.db("coursera_nodejs");

        //Read the isbn number for which review needs to be deleted from query param
        const isbn:any = req.query.isbn;

        //Read the user name
        const user:any = req.query.user;

        //Perform the modify or update operation
        const result:any = await db.collection("books").updateOne(
            { "isbn": `${isbn}` }, 
            { $unset: { "reviews": "" } }
        );
        
        //Validate the result
        if(result.acknowledged){ 
            res.status(200).json({"Success" : `Reviews for the ISBN ${isbn} posted by the user ${user} deleted.`});
        }else{
            res.status(401).json({"Failure" : "Error in deletion of review!!"})
        }
    }catch(err){
        res.status(500).json({"Critical ERR":"Server Error!!!!"});
    }finally{
        client.close();
        res.end();
    }
});

//export the module
export default delReview;