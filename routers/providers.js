import express from 'express';
// import res from 'express/lib/response';
// import { type } from 'express/lib/response';
import { ObjectId } from "mongodb"
// import { response } from 'express';
import { client } from '../index.js'

const router = express.Router();

router.get("/:limit/:skip", async function (request, response) {
    const Count1 = await client.db("umusic").collection("provider").find().count();
    console.log(Count1);
    const limit1 = request.params.limit;
    const skip1 = request.params.skip;
    const authpro = await client.db("umusic").collection("provider").find().limit(parseInt(limit1)).skip(parseInt(skip1)).toArray();
    // response.send(authpro);
    const data = {
        count : Count1,
        value : authpro
    }
    response.send(data);
})

router.get("/:id", async function (request, response) {
    const authpro = await client.db("umusic").collection("provider").findOne({ "_id": ObjectId(request.params.id) })
    response.send(authpro);
})

router.delete("/:id", async function (request, response) {
    const authpro = await client.db("umusic").collection("provider").deleteOne({ "_id": ObjectId(request.params.id) });
    response.send(authpro);
})

router.post("/", async function (request, response) {
    //  const newAuthpro = request.body;
    const result = await client.db("umusic").collection("provider").insertMany(request.body);
    response.send(result);
})

router.put("/:id", async function (request, response) {
    const { id } = request.params;
    const editValue = request.body;
    const result = await client.db("umusic").collection("provider").updateOne({ "_id": ObjectId(request.params.id) }, { $set: editValue })
    response.send(result);
})
router.post("/getByname", async (req, res) => {
    const val = req.body.name
    const regex = new RegExp([val].join(""), "i");
    const allTasks = await client.db("umusic").collection("provider").find({ name: { $regex: regex } }).toArray()
    // if(!allTasks || allTasks.length === 0) res.status(400).send({error : "No task was found"})
    // res.status(200).send(allTasks)
    res.send(allTasks)
    
})
export const providers = router;