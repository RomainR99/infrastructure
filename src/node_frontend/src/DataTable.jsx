import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ entreprise: "", poste: "", email: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filtre, setFiltre] = useState("");
  const outsideClick = useRef(null);
  const itemsPerPage = 5;
  const [error, setError] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (outsideClick.current && !outsideClick.current.contains(event.target)) {
        setEditId(null);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/candidatures")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Données invalides :", response.data);
          setError("Erreur lors du chargement des données");
        }
      })
      .catch((err) => {
        setError("Erreur lors du chargement des données");
        console.error(err);
      });
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    if (
      !formData.entreprise || formData.entreprise.length < 2 ||
      !formData.poste || formData.poste.length < 2 ||
      !formData.email || formData.email.length < 5
    ) {
      setError("Tous les champs doivent être remplis correctement !");
      return;
    }

    axios.post("http://localhost:8000/api/candidatures", formData, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      setData((prevData) => [...prevData, response.data]);
      setFormData({ entreprise: "", poste: "", email: "" });
      setError(null);
    })
    .catch((err) => {
      setError("Erreur lors de l'ajout");
      console.error(err);
    });
  };

  const handleEditClick = (item) => {
    setEditId(item._id);
    setEditForm(item);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (id) => {
    axios.put(`http://localhost:8000/api/candidatures/${id}`, editForm)
      .then(() => {
        setData((prevData) =>
          prevData.map((item) => (item._id === id ? { ...item, ...editForm } : item))
        );
        setEditId(null);
      })
      .catch((err) => {
        setError("Erreur lors de la modification");
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/candidatures/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item._id !== id));
      })
      .catch((err) => {
        setError("Erreur lors de la suppression");
        console.error(err);
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Recherche sur poste
  const filteredItems = data.filter((item) =>
    item.poste && item.poste.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredData = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  console.log("Données chargées:", data);

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}

      <div className="add-container">
        <div className="info-container">
          <input
            type="text"
            placeholder="Entreprise"
            name="entreprise"
            value={formData.entreprise}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Poste"
            name="poste"
            value={formData.poste}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <button className="add" onClick={handleAddClick}>Ajouter</button>
      </div>

      <div className="search-table-container">
        <input
          className="search-input"
          type="text"
          placeholder="Recherche par poste"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table ref={outsideClick}>
          <thead>
            <tr>
              <th>Entreprise</th>
              <th>Poste</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>
                <td>{editId === item._id ? (
                  <input
                    type="text"
                    name="entreprise"
                    value={editForm.entreprise}
                    onChange={handleEditChange}
                  />
                ) : item.entreprise}</td>
                <td>{editId === item._id ? (
                  <input
                    type="text"
                    name="poste"
                    value={editForm.poste}
                    onChange={handleEditChange}
                  />
                ) : item.poste}</td>
                <td>{editId === item._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                  />
                ) : item.email}</td>
                <td className="actions">
                  {editId === item._id ? (
                    <button className="save" onClick={() => handleEditSave(item._id)}>Sauvegarder</button>
                  ) : (
                    <button className="edit" onClick={() => handleEditClick(item)}>Modifier</button>
                  )}
                  <button className="delete" onClick={() => handleDelete(item._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              style={{ backgroundColor: currentPage === index + 1 ? "lightgreen" : "" }}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Liste des Candidatures</h2>
        <select onChange={(e) => setFiltre(e.target.value)} value={filtre}>
          <option value="">Tous</option>
          <option value="En attente">En attente</option>
          <option value="Acceptée">Acceptée</option>
          <option value="Refusée">Refusée</option>
        </select>
        <ul>
          {data
            .filter(c => !filtre || c.statut === filtre)
            .map((candidature) => (
              <li key={candidature._id}>
                {candidature.entreprise} - {candidature.poste} - {candidature.statut}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DataTable;


