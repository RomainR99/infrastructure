import mongoose from 'mongoose';

const candidatureShema = mongoose.Schema(
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
      match: /^[0-9]{10}$/ // Validation pour un n°tel , doit etre de 10 chiffres
    },
    status: {
      type: String,
      enum: ['en attente', 'accepter', 'refuser'],
      default: 'en attente'
    },
    poste: {
      type: String,
      required: true
    },
    
  },
  {
    timestamps: true // Ajoute createdAt et updatedAt automatiquement
  }
);

export default mongoose.model('candidatures', candidatureShema);

//Le champ timestamps: true permet de générer automatiquement les champs createdAt et updatedAt //pour chaque document.