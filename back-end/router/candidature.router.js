import express from 'express';
import {
  createCandidature,
  readCandidature,
  getStats 
} from '../controllers/candidatures.controller.js';

const router = express.Router();

// Route pour créer une candidature
router.post('/post', createCandidature);

// Route pour lire les candidatures
router.get('/get', readCandidature);

// Nouvelle route pour obtenir les statistiques
router.get('/stats', getStats);

export default router;
