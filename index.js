const express = require("express");
const app = express();
const cors = require("cors");
// MongoClient
const { MongoClient } = require("mongodb");

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
// dotenv
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vhm4c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongodb connection
async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World! I am from Earth");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
