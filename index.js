const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
    res.send("Dream Holiday Server Running");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});