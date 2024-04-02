//This module is used to add/modify a book review
//import the express module
import * as express from "express";

//import the mongodb 
import * as mongodb from 'mongodb';

//Create this as a sub-module
const reviewAdded:any = express.Router();

//Create a PUT REST service to modify book review
reviewAdded.put("/",async (req:any,res:any):Promise<any>=>{
    //get the client and build connection
    const client:any = new mongodb.MongoClient("mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority");

    try{
        //Get the db reference
        const db:any = client.db("coursera_nodejs");

        //Read the isbn number for which review needs to added from query param
        const isbn:any = req.query.isbn;

        //also read the review comment from the query param
        const review:any = req.query.review;

        //Perform the modify or update operation
        const result:any = await db.collection("books").updateOne({"isbn":isbn},{
            $set:{
                "reviews":{
                    "comment" : `${review}`
                }
            }
        });
        
        //Validate the result
        if(result.acknowledged){ 
            res.status(200).json({"Success" : `The review for the book with ISBN ${isbn} has been added/updated`});
        }else{
            res.status(401).json({"Failure" : "Error in review addition!!"})
        }
    }catch(err){
        res.status(500).json({"Critical ERR":"Server Error!!!!"});
    }finally{
        client.close();
        res.end();
    }
});

//export the module
export default reviewAdded;