import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import {authentication} from './routers/authenticationproviders.js'
import { shopify } from './routers/shopifystores.js';
import {application} from './routers/application.js';
import {providers} from './routers/providers.js';
const app = express();
app.use(cors());
// app.use(express.json());

const MONGODB_URL = "mongodb+srv://toor:toor@cluster0.mfvku.mongodb.net/test"
async function createConnection() {
    const client = new MongoClient(MONGODB_URL);
    await client.connect();
    console.log("mongodb connected")
    return client;
}

export const client = await createConnection();
app.use(express.json())
app.use('/authenticationproviders', authentication)
app.use('/shopifystores',shopify)
app.use('/application',application)
app.use('/providers',providers)
// app.listen(9001, () => {
//     console.log('Server Started')
// })

const port = process.env.PORT || 9001
app.listen(port,function(){
    console.log("BE Started at port 9002")
        
    
});

