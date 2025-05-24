import { useEffect, useState } from "react";

const CandidatureList = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [filtre, setFiltre] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/candidatures")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((data) => setCandidatures(data))
      .catch((err) => console.error("Erreur chargement candidatures", err));
  }, []);
  
  

  return (
    <div>
      <h2>Liste des Candidatures</h2>
      <select onChange={(e) => setFiltre(e.target.value)}>
        <option value="">Tous</option>
        <option value="En attente">En attente</option>
        <option value="Acceptée">Acceptée</option>
        <option value="Refusée">Refusée</option>
      </select>
      <ul>
        {candidatures
          .filter(c => !filtre || c.statut === filtre)
          .map((candidature) => (
            <li key={candidature._id}>
              {candidature.entreprise} - {candidature.poste} - {candidature.statut}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CandidatureList;