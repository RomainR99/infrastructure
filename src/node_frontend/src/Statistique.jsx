import { useEffect, useState } from "react";

const Statistiques = () => {
  const [stats, setStats] = useState({
    total: 0,
    enAttente: 0,
    acceptees: 0,
    refusees: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/candidatures/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement stats", err);
        setError("Impossible de charger les statistiques.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des statistiques...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white shadow-md p-4 rounded-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">Statistiques</h2>
      <ul className="space-y-1">
        <li>Total : {stats.total}</li>
        <li>En attente : {stats.enAttente}</li>
        <li>Acceptées : {stats.acceptees}</li>
        <li>Refusées : {stats.refusees}</li>
      </ul>
    </div>
  );
};

export default Statistiques;

