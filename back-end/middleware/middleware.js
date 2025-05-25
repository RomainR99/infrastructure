const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

let data = [];

// Récupérer toutes les entrées
app.get("/api/data", (req, res) => {
  res.json(data);
});

// Ajouter une nouvelle entrée
app.post("/api/data", (req, res) => {
  const {
    name,
    email,
    phone,
    entreprise,
    poste,
    status,
    dateEntretien,
  } = req.body;

  // Vérification des champs requis
  if (!name || !email || !phone || !entreprise || !poste || !dateEntretien) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const newItem = {
    id: Date.now(),
    name,
    email,
    phone,
    entreprise,
    poste,
    status: status || "en attente",
    dateEntretien,
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

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
