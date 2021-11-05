const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// MongoDB START
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vwkey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("dreamHolidayDatabase");
        const tourCollection = database.collection("tourCollection");
        const orderCollection = database.collection("orderCollection");
        const contactCollection = database.collection("contactCollection");

        // GET ALL TOURS API
        app.get('/tours', async (req, res) => {
            const email = req.query.email;
            let query;
            let cursor;

            if (email) {
                query = { email: email };
                cursor = orderCollection.find(query);
            }

            else {
                query = {};
                cursor = tourCollection.find(query);
            };

            const events = await cursor.toArray();
            res.send(events);
        });

        // GET SINGLE TOUR API
        app.get('/tours/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const cursor = tourCollection.findOne(query);
            const event = await cursor;
            res.send(event);
        });

        // POST TOUR API
        app.post('/tours', async (req, res) => {
            const tour = req.body;
            const result = await tourCollection.insertOne(tour);
            res.send(result);
        });
    }

    finally {
        // await client.close();
    }
}
run().catch(console.dir);
// MongoDB END

app.get('/', (req, res) => {
    res.send("Dream Holiday Server Running");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});