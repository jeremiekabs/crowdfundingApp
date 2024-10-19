import React, { useState } from "react";
import axios from "axios";
import Loader from "../../shared/loader";

function Categorie() {
  const [nom, setNom] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/categorie/create", { nom })
      .then((response) => {
        if (response.data.status_code === 200) {
          setMessage(response.data.success_msg);
          setNom(''); // Reset the field after successful registration
        } else if (response.data.status_code !== 200) {
          setMessage("La catégorie existe déjà");
          setNom('');
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
      });
  };

  const renderData = () => {
    return (
      <section className="categorie-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h2>Créez votre catégorie</h2>
              <p>
                Organisez efficacement vos produits en créant une nouvelle catégorie.
                Cela facilitera la navigation pour vos clients et mettra en valeur
                vos articles.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">
                    Nom de la Catégorie
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={nom}
                    className="form-control"
                    onChange={(e) => setNom(e.target.value)}
                    required // Add validation
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Enregistrer
                </button>
                {message && <p className="mt-3">{message}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return <div>{renderData()}</div>;
}

export default Categorie;
