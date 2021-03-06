import express from 'express';
import {ObjectId} from "mongodb"
// import { response } from 'express';
import {client} from '../index.js'

const router = express.Router();

router.get("/:limit/:skip", async function (request, response) {
    const Count1 = await client.db("umusic").collection("shop").find().count();
    console.log(Count1);
    const limit1 = request.params.limit;
    const skip1 = request.params.skip;

    const shop = await client.db("umusic").collection("shop").find().limit(parseInt(limit1)).skip(parseInt(skip1)).toArray();
    // response.send(shop);
    const data = {
        count : Count1,
        value : shop
    }
    response.send(data);
})

router.get("/:id", async function(request, response) {
    const shop = await client.db("umusic").collection("shop").findOne({"_id":ObjectId(request.params.id)})
    response.send(shop);
})

router.delete("/:id", async function(request, response) {
    const shop = await client.db("umusic").collection("shop").deleteOne({"_id":ObjectId(request.params.id)});
    response.send(shop);
})

router.post("/", async function(request, response){
    //  const newshop = request.body;
     const result = await client.db("umusic").collection("shop").insertMany(request.body);
     response.send(result);
})

router.put("/:id", async function(request, response){
    const { id } = request.params;
    const editValue = request.body;
    const result = await client.db("umusic").collection("shop").updateOne({"_id":ObjectId(request.params.id)},{$set:editValue})
    response.send(result);
})

router.post("/getByname", async (request, response) => {
    const val = request.body.name
    const regex = new RegExp([val].join(""), "i");
    const allTasks = await client.db("umusic").collection("shop").find({ name: { $regex: regex } }).toArray()
    // if(!allTasks || allTasks.length === 0) res.status(400).send({error : "No task was found"})
    // res.status(200).send(allTasks)
    response.send(allTasks)
    
})
export const shopify=router;