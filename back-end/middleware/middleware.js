const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors()); // Autoriser les requêtes depuis le frontend
app.use(bodyParser.json()); // Parser les requêtes JSON

let data = []; // Stockage temporaire des données

// Récupérer toutes les entrées
app.get("/api/data", (req, res) => {
  res.json(data);
});

// Ajouter une nouvelle entrée
app.post("/api/data", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const newItem = {
    id: Date.now(),
    name,
    email,
    phone,
  };

  data.push(newItem);
  res.status(201).json(newItem);
});

// Supprimer une entrée par ID
app.delete("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  data = data.filter((item) => item.id !== id);
  res.json({ message: "Élément supprimé avec succès." });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});