import express from 'express';
import {
  createCandidature,
  readCandidature,
  getStats,
  updateCandidature,
  deleteCandidature,
} from '../controllers/candidatures.controller.js';

const router = express.Router();

// Créer une candidature
router.post('/', createCandidature);

// Lire toutes les candidatures (avec éventuellement un filtre en query)
router.get('/', readCandidature);

// Obtenir les statistiques
router.get('/stats', getStats);

// Mettre à jour une candidature par ID
router.put('/:id', updateCandidature);

// Supprimer une candidature par ID
router.delete('/:id', deleteCandidature);

export default router;

