import mongoose from 'mongoose';

const CandidatureSchema = new mongoose.Schema(
  {
    entreprise: {
      type: String,
      required: true,
      minLength: 2,
      trim: true
    },
    poste: {
      type: String,
      required: true,
      minLength: 2,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ // Validation email
    },
    statut: {
      type: String,
      enum: ["En attente", "Acceptée", "Refusée"],
      default: "En attente"
    },
    dateEntretien: {
      type: Date,
      default: null // Peut être rempli plus tard
    },
    commentaire: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true // Ajoute createdAt et updatedAt automatiquement
  }
);

export default mongoose.model("Candidature", CandidatureSchema);


//Le champ timestamps: true permet de générer automatiquement les champs createdAt et updatedAt //pour chaque document.