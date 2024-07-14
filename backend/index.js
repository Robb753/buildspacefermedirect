const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToServer, getDb } = require("./db");
const UserModel = require("./models/User");
require("dotenv").config();

const app = express()
const PORT = process.env.PORT || 5000

// Utilisation du middleware CORS
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

// Connect to MongoDB
connectToServer()
  .then(() => {
    // Define a route to get all users
    app.get("/", async (req, res) => {
      try {
        const users = await UserModel.find();
        console.log("Fetched users:", users); // Log the fetched users
        res.json(users);
      } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
      }
    });

    const emailSchema = new mongoose.Schema({ email: String });
    const EmailModel = mongoose.model("Email", emailSchema);

    app.post("/subscribe", async (req, res) => {
      const { email } = req.body;
      try {
        const newEmail = new EmailModel({ email });
        await newEmail.save(); // Corrected use of mongoose
        res.status(200).json({ success: true });
      } catch (err) {
        console.error("Error saving email:", err);
        res.status(500).json({ success: false });
      }
    });

    // Route de test
    app.get("/", (req, res) => {
      res.send("Le serveur fonctionne correctement !");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
