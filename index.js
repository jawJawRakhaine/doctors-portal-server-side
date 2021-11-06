const express = require("express");
const app = express();
const cors = require("cors");
// MongoClient
const { MongoClient } = require("mongodb");

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
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
    const database = client.db("doctors_portal");
    const AppointmentCollection = database.collection("appointments");
    // get a individual appointment
    app.get("/appointments", async (req, res) => {
      const email = req.query.email;
      const date = new Date(req.query.date).toLocaleDateString();
      const query = { email: email, date: date };
      const cursor = await AppointmentCollection.find(query);
      const appointments = await cursor.toArray();
      res.json(appointments);
    });

    // post a new appointment
    app.post("/appointments", async (req, res) => {
      const appointment = req.body;
      const result = await AppointmentCollection.insertOne(appointment);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World! I am from Earth");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// // get all users
// app.get("/users");
// // post a user
// app.post("/users");
// // get a user
// app.get("/users/:id");
// // update a user
// app.put("/users/:id");
// // delete a user
// app.delete("/users/:id");
