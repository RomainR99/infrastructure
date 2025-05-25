import express from 'express';
import {
  createCandidature,
  readCandidature,
  getStats,
  updateCandidature,
  deleteCandidature,
} from '../controllers/candidatures.controller.js';

const router = express.Router();

/**
 * @route   POST /api/candidatures
 * @desc    Créer une nouvelle candidature
 */
router.post('/', createCandidature);

/**
 * @route   GET /api/candidatures
 * @desc    Lire toutes les candidatures (avec options de filtre)
 */
router.get('/', readCandidature);

/**
 * @route   GET /api/candidatures/stats
 * @desc    Obtenir des statistiques de candidatures
 */
router.get('/stats', getStats);

/**
 * @route   PUT /api/candidatures/:id
 * @desc    Mettre à jour une candidature existante
 */
router.put('/:id', updateCandidature);

/**
 * @route   DELETE /api/candidatures/:id
 * @desc    Supprimer une candidature
 */
router.delete('/:id', deleteCandidature);

export default router;



