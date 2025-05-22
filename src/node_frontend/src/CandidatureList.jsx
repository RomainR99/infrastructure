import { useEffect, useState } from "react";

const CandidatureList = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/candidatures")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((data) => {
        setCandidatures(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement candidatures", err);
        setError("Impossible de charger les candidatures.");
        setLoading(false);
      });
  }, []);

  const candidaturesFiltrees = candidatures.filter(
    (c) => !filtre || c.statut === filtre
  );

  if (loading) return <p>Chargement des candidatures...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white shadow-md p-4 rounded-md max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Liste des Candidatures</h2>
      <div className="mb-4">
        <label htmlFor="filtre" className="mr-2">Filtrer par statut :</label>
        <select
          id="filtre"
          onChange={(e) => setFiltre(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Tous</option>
          <option value="En attente">En attente</option>
          <option value="Acceptée">Acceptée</option>
          <option value="Refusée">Refusée</option>
        </select>
      </div>
      <p className="mb-2 text-sm text-gray-600">
        {candidaturesFiltrees.length} candidature(s) affichée(s)
      </p>
      <ul className="list-disc list-inside space-y-1">
        {candidaturesFiltrees.map((c) => (
          <li key={c._id}>
            <strong>{c.entreprise}</strong> - {c.poste} - <em>{c.statut}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidatureList;
