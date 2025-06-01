import mongoose from 'mongoose';

const candidatureSchema = mongoose.Schema(
  {
    entreprise: {
      type: String,
      minLength: 3,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ // Validation d'email
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/ // Validation pour un numéro de téléphone à 10 chiffres
    },
    status: {
      type: String,
      enum: ['en attente', 'acceptée', 'refusée'], // valeurs autorisées en minuscules
      default: 'en attente'
    },
    poste: {
      type: String,
      required: true
    },
    dateEntretien: {
      type: Date,               
      required: true
    },
  },
  {
    timestamps: true // Ajoute createdAt et updatedAt automatiquement
  }
);

export default mongoose.model('candidatures', candidatureSchema);
