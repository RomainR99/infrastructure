import app from './app.js';
import ENV from './config/env.js';
import candidatureRoutes from './routes/candidatures.routes.js';

app.use('/api/candidatures', candidatureRoutes);

const PORT = ENV.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});





