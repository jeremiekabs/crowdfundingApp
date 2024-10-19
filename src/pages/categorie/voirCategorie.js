import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../shared/loader";
import { useNavigate } from "react-router-dom";
import { authContext } from "../helpers/appContex";

function VoirCategorie() {
  let navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);
  const [loader, setLoader] = useState(true);
  const { user } = useContext(authContext);

  useEffect(() => {
    categorieRequest();
  }, []);

  const categorieRequest = async () => {
    await axios.get("http://localhost:8000/api/categorie").then((res) => {
      setCategorys(res.data.categories);
      setLoader(false);
    });
  };

  return (
    loader ? (
      <Loader />
    ) : (
    <section className="categorie-section">
      <div className="container mt-5">
        <h2>Gestion des Catégories</h2>
        <p>
          Gérez efficacement vos catégories pour une meilleure organisation de
          vos produits et une navigation simplifiée pour vos clients.
        </p>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col" className="text-center">Nom</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {categorys.map((category) => (
              <tr key={category.id}>
                <td className="text-center">{category.nom}</td>
                <td className="text-center">
                  <a
                    href="#"
                    onClick={() => navigate(`categorie/${category.id}`)}
                    className="btn btn-primary m-1"
                  >
                    Éditer
                  </a>
                  <a
                    href="#"
                    onClick={() => navigate(`delete/${category.id}`)}
                    className="btn btn-danger m-1"
                  >
                    Retirer
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    )
  );
}

export default VoirCategorie;
