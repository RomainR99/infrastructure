import Candidature from '../models/candidatures.model.js';

// ✅ Créer une nouvelle candidature
export const createCandidature = async (req, res) => {
    try {
      const { entreprise, poste, email, statut, dateEntretien, name ,phone, } = req.body;
  
      const nouvelleCandidature = new Candidature({
        entreprise,
        poste,
        email,
        statut,
        dateEntretien,
        name,
        phone
      });
  
      const saved = await nouvelleCandidature.save();
      res.status(201).json({ message: "Candidature ajoutée avec succès", data: saved });
    } catch (err) {
      console.error("Erreur lors de la création :", err);
      res.status(500).json({ message: "Erreur lors de la création de la candidature", error: err.message });
    }
  };
  

// ✅ Lire les candidatures (filtrage via query si fourni)
export const readCandidature = async (req, res) => {
  try {
    const filter = req.query || {}; // Permet de filtrer via query params
    const candidatures = await Candidature.find(filter).sort({ createdAt: -1 }); // Trie par date décroissante
    res.status(200).json(candidatures);
  } catch (err) {
    console.error("Erreur lors de la lecture :", err);
    res.status(500).json({ message: "Erreur lors de la lecture des candidatures", error: err.message });
  }
};

// ✅ Supprimer une candidature
export const deleteCandidature = async (req, res) => {
  try {
    const { id } = req.params;
    const candidature = await Candidature.findById(id);

    if (!candidature) {
      return res.status(404).json({ message: "Candidature non trouvée" });
    }

    await Candidature.findByIdAndDelete(id);
    res.status(200).json({ message: "Candidature supprimée avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
  }
};

// ✅ Mettre à jour une candidature
export const updateCandidature = async (req, res) => {
  try {
    const { id } = req.params;

    const candidature = await Candidature.findById(id);
    if (!candidature) {
      return res.status(404).json({ message: "Candidature non trouvée" });
    }

    const updated = await Candidature.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.status(200).json({ message: "Candidature mise à jour", data: updated });
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
};

// ✅ Statistiques des candidatures
export const getStats = async (req, res) => {
  try {
    const statsAgg = await Candidature.aggregate([
      {
        $group: {
          _id: "$statut",
          count: { $sum: 1 }
        }
      }
    ]);

    const stats = {
      total: 0,
      enAttente: 0,
      acceptees: 0,
      refusees: 0
    };

    statsAgg.forEach(item => {
      stats.total += item.count;
      switch (item._id) {
        case "En attente":
          stats.enAttente = item.count;
          break;
        case "Acceptée":
          stats.acceptees = item.count;
          break;
        case "Refusée":
          stats.refusees = item.count;
          break;
      }
    });

    res.status(200).json(stats);
  } catch (err) {
    console.error("Erreur getStats :", err);
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques", error: err.message });
  }
};

  