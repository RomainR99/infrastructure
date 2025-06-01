import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    entreprise: "",
    poste: "",
    email: "",
    phone: "",
    status: "en attente",
    name: "",
    dateEntretien: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [editForm, setEditForm] = useState({});
  const outsideClick = useRef(null);
  const itemsPerPage = 5;

  // Réinitialiser la page lors d'une nouvelle recherche
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Gestion du clic extérieur pour fermer le mode édition
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

  // Charger les données à l'initialisation
  useEffect(() => {
    axios.get("http://localhost:8000/api/candidatures")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setError("Erreur lors du chargement des données");
        }
      })
      .catch(() => {
        setError("Erreur lors du chargement des données");
      });
  }, []);

  // Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Recherche par poste
  const handleSearch = (event) => setSearchTerm(event.target.value);

  // Gestion du formulaire d'ajout
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Ajouter une nouvelle candidature
  const handleAddClick = () => {
    if (
      !formData.entreprise || formData.entreprise.trim().length < 2 ||
      !formData.poste || formData.poste.trim().length < 2 ||
      !formData.email || formData.email.trim().length < 5 ||
      !formData.phone || formData.phone.trim().length < 5 ||
      !formData.name || formData.name.trim().length < 2
    ) {
      setError("Tous les champs doivent être remplis correctement !");
      return;
    }

    if (!formData.dateEntretien) {
      setError("La date d'entretien est obligatoire !");
      return;
    }

    const payload = {
      entreprise: formData.entreprise.trim(),
      poste: formData.poste.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      status: formData.status,
      name: formData.name.trim(),
      dateEntretien: formData.dateEntretien,
    };

    axios.post("http://localhost:8000/api/candidatures", payload, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const newItem = response.data.data || response.data;
        setData((prevData) => [...prevData, newItem]);
        setFormData({
          entreprise: "",
          poste: "",
          email: "",
          status: "en attente",
          phone: "",
          name: "",
          dateEntretien: ""
        });
        setError(null);
      })
      .catch((err) => {
        setError("Erreur lors de l'ajout");
        console.error("Erreur POST:", err.response?.data || err);
      });
  };

  // Éditer une candidature : ouverture du mode édition
  const handleEditClick = (item) => {
    setEditId(item._id);
    setEditForm({ ...item });
  };

  // Gestion du formulaire d'édition
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Sauvegarder les modifications
  const handleEditSave = (id) => {
    axios.put(`http://localhost:8000/api/candidatures/${id}`, editForm)
      .then(() => {
        setData((prevData) =>
          prevData.map((item) => (item._id === id ? { ...item, ...editForm } : item))
        );
        setEditId(null);
        setError(null);
      })
      .catch((err) => {
        setError("Erreur lors de la modification");
        console.error(err.response?.data || err);
      });
  };

  // Supprimer une candidature
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/candidatures/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item._id !== id));
        setError(null);
      })
      .catch(() => {
        setError("Erreur lors de la suppression");
      });
  };

  // Calcul des index pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtrage des données par recherche
  const filteredItems = data.filter((item) =>
    item.poste && item.poste.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Découpage des données pour la page courante
  const filteredData = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}

      {/* Formulaire ajout */}
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
            placeholder="Nom"
            name="name"
            value={formData.name}
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
          <input
            type="tel"
            placeholder="Téléphone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="en attente">En attente</option>
            <option value="acceptée">Acceptée</option>
            <option value="refusée">Refusée</option>
          </select>
          <input
            type="date"
            name="dateEntretien"
            value={formData.dateEntretien}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn-add" onClick={handleAddClick}>
          Ajouter
        </button>
      </div>

      {/* Recherche */}
      <input
        type="text"
        placeholder="Rechercher par poste"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Tableau */}
      <table className="table">
        <thead>
          <tr>
            <th>Entreprise</th>
            <th>Nom</th>
            <th>Poste</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Statut</th>
            <th>Date entretien</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody ref={outsideClick}>
          {filteredData.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                Aucune candidature trouvée
              </td>
            </tr>
          )}
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>
                {editId === item._id ? (
                  <input
                    type="text"
                    name="entreprise"
                    value={editForm.entreprise || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  item.entreprise
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <input
                    type="text"
                    name="poste"
                    value={editForm.poste || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  item.poste
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  item.email
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone || ""}
                    onChange={handleEditChange}
                  />
                ) : (
                  item.phone
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <select
                    name="status"
                    value={editForm.status || ""}
                    onChange={handleEditChange}
                  >
                    <option value="en attente">En attente</option>
                    <option value="acceptée">Acceptée</option>
                    <option value="refusée">Refusée</option>
                  </select>
                ) : (
                  item.status
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <input
                    type="date"
                    name="dateEntretien"
                    value={
                      editForm.dateEntretien
                        ? editForm.dateEntretien.slice(0, 10)
                        : ""
                    }
                    onChange={handleEditChange}
                  />
                ) : item.dateEntretien ? (
                  new Date(item.dateEntretien).toLocaleDateString()
                ) : (
                  ""
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <>
                    <button
                      className="btn-save"
                      onClick={() => handleEditSave(item._id)}
                    >
                      Sauvegarder
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => setEditId(null)}
                    >
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClick(item)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item._id)}
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredItems.length / itemsPerPage) },
          (_, i) => i + 1
        ).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTable;







