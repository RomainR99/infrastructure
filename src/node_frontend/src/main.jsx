import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Statistiques from "./Statistique.jsx";
import CandidatureList from "./CandidatureList.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Statistiques/>
    <CandidatureList/>
  </React.StrictMode>,
)