import { useEffect, useState } from "react";

const CandidatureList = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    enAttente: 0,
    acceptees: 0,
    refusees: 0,
  });

  // 🔁 Charger les candidatures
  const fetchCandidatures = () => {
    fetch("http://localhost:8000/api/candidatures")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((data) => setCandidatures(data))
      .catch((err) => console.error("Erreur chargement candidatures", err));
  };

  // 📊 Charger les stats
  const fetchStats = () => {
    fetch("http://localhost:8000/api/candidatures/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Erreur chargement stats", err));
  };

  // 🧠 Mettre à jour une candidature
  const updateStatus = (id, nouveauStatus) => {
    fetch(`http://localhost:8000/api/candidatures/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nouveauStatus }), // clé corrigée ici
    })
      .then((res) => res.json())
      .then(() => {
        fetchCandidatures();
        fetchStats(); // ✅ mise à jour des stats
      })
      .catch((err) => console.error("Erreur modification statut", err));
  };

  useEffect(() => {
    fetchCandidatures();
    fetchStats();
  }, []);

  // Options compatibles avec backend
  const optionsStatus = [
    { label: "Tous", value: "" },
    { label: "En attente", value: "en attente" },
    { label: "Acceptée", value: "acceptée" },
    { label: "Refusée", value: "refusée" },
  ];

  return (
    <div>
      <h2>Liste des Candidatures</h2>

      {/* 🔢 Affichage des stats */}
      <div>
        <p>Total : {stats.total}</p>
        <p>En attente : {stats.enAttente}</p>
        <p>Acceptées : {stats.acceptees}</p>
        <p>Refusées : {stats.refusees}</p>
      </div>

      <select onChange={(e) => setFiltre(e.target.value)} value={filtre}>
        {optionsStatus.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <ul>
        {candidatures
          .filter((c) => !filtre || c.status === filtre)  // clé corrigée ici et valeurs en minuscules
          .map((candidature) => (
            <li key={candidature._id}>
              {candidature.entreprise} - {candidature.poste} - {candidature.status}
              {/* 🔄 Sélecteur de statut */}
              
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CandidatureList;
