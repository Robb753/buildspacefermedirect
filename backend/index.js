const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { connectToServer } = require("./db");
const userRoutes = require("./routes/users");
const subscribeRoutes = require("./routes/subscribe");

const app = express()
const PORT = process.env.PORT || 5000

// Configuration du middleware CORS pour autoriser l'origine Netlify
const corsOptions = {
  origin: 'https://fermedirect.netlify.app', // Remplacez par l'URL de votre frontend
  optionsSuccessStatus: 200
};

// Utilisation du middleware CORS
app.use(express.json())
app.use(cors(corsOptions));
app.use(bodyParser.json())

// Connect to MongoDB
connectToServer()
  .then(() => {
    // Utilisation des routes
    app.use("/api/users", userRoutes);
    app.use("/api/subscribe", subscribeRoutes);

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
