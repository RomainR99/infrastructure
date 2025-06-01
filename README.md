# <p align="center">HETIC - Candidature Tracker</p>

## 🧐 Features    
- Liste interactive des candidatures
- Filtres par statut (en attente, acceptée, refusée)
- Modification du statut via l'interface


## 🛠️ Tech Stack
### Frontend
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)


### Backend
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) 
- [CORS](https://www.npmjs.com/package/cors)
- [Mongoose](https://mongoosejs.com/) 

## 📁 API Endpoints
| Endpoint                        | Méthode | Description                          |
|---------------------------------|---------|--------------------------------------|
| `/api/candidatures`            | GET     | Récupère toutes les candidatures     |
| `/api/candidatures/:id`        | PUT     | Met à jour le statut d’une candidature |
| `/api/candidatures/stats`      | GET     | Renvoie les statistiques globales    |

## 🛠️ Installation

### 1. Backend
```bash
cd backend
npm install
npm run dev

# Rendu Finale

<img src="./src/node_frontend/src/assets/rendu finale1.png" alt="Image" width="300"/>
<img src="./src/node_frontend/src/assets/rendu finale.png" alt="Image" width="300"/>

# Mise en place du projet 
<img src="./src/node_frontend/src/assets/mise en place react pour front.png" alt="Image" width="300"/>
<img src="./src/node_frontend/src/assets/mise en place react pour front2.png" alt="Image" width="300"/>
<img src="./src/node_frontend/src/assets/mise en place react pour front3.png" alt="Image" width="300"/>

# Appel des API
<img src="./back-end/asset/API local de candidatures.png" alt="Image" width="300"/>
<img src="./back-end/asset/API des stats.png" alt="Image" width="300"/>


