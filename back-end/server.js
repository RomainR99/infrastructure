import app from './app.js';
import ENV from './config/env.js';
import candidatureRoutes from './routes/candidatures.routes.js';

// Données fictives pour l'exemple
let data = [
  { id: 1, name: 'John', email: 'john@example.com', phone: '123-456-7890', status: 'en_attente' },
  { id: 2, name: 'Jane', email: 'jane@example.com', phone: '987-654-3210', status: 'acceptee' },
];

// 👉 Appliquer les routes de candidatures AVANT de démarrer le serveur
app.use('/api/candidatures', candidatureRoutes);

// Exemple POST
app.post('/api/data', (req, res) => {
  const { name, email, phone } = req.body;
  const newItem = {
    id: Date.now(),
    name,
    email,
    phone,
  };
  data.push(newItem);
  res.status(201).json(newItem);
});

// Exemple DELETE
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;
  data = data.filter(item => item.id !== parseInt(id));
  res.status(200).json({ message: 'Élément supprimé avec succès' });
});

const PORT = ENV.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});





