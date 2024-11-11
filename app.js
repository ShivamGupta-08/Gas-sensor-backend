// server.js
import express from 'express';


// const Helmet = require('./models/Helmet');
import { MongoClient } from 'mongodb';
import cors from 'cors'

// Initialize Express app
const app = express();
const PORT = 3001;
app.use(cors());
// Middleware to parse JSON
app.use(express.json()); 
const uri="mongodb+srv://shivamgupta08012008:shivam0801@gas-monitoring-helmet.w9qkn.mongodb.net/?retryWrites=true&w=majority&appName=Gas-Monitoring-Helmet";
// Connect to MongoDB
// mongoose.connect('mongodb+srv://shivamgupta08012008:shivam0801@gas-monitoring-helmet.w9qkn.mongodb.net/?retryWrites=true&w=majority&appName=Gas-Monitoring-Helmet/helmetData', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
  
// }).then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function connectToDatabase() {
  await client.connect();
  console.log("Connected to MongoDB Atlas");
}




// Endpoint to update helmet data
app.post('/update-data', async (req, res) => {
  const { helmetId, mq2Level, mq7Level } = req.body;

  // Ensure the required data is present
  if (!helmetId || !mq2Level || !mq7Level) {
    return res.status(400).send("Missing required fields");
  }

  const filter = { "helmetId": helmetId };
  const update = {
    $set: { 
      "mq2Level": mq2Level,
      "mq7Level": mq7Level
    }
  };

  try {
    const result = await collection.updateOne(filter, update);
    if (result.modifiedCount > 0) {
      res.status(200).send("Document updated successfully");
    } else {
      res.status(404).send("No document found with the given helmetId");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Error updating data");
  }
});


// // Endpoint to retrieve helmet data by helmetId
// GET endpoint to retrieve helmet data by helmetId
app.get("/get-helmet-data/:helmetId", async (req, res) => {
  const helmetId = req.params.helmetId;

  try {
    const database = client.db("GasData"); // Replace with your database name
    const collection = database.collection("helmetdata");

    // Query the database for a helmet with the given helmetId
    const helmet = await collection.findOne({ helmetId });

    if (helmet) {
      res.status(200).json(helmet); // Return the helmet data as JSON
    } else {
      res.status(404).json({ message: "Helmet not found" }); // If no helmet is found
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});


// Start the server
app.listen(PORT,async  () => {
  await connectToDatabase();
  console.log(`Server running on port ${PORT}`);
});
