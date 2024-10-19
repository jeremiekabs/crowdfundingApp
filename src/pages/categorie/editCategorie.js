import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../shared/loader";
import { useNavigate } from "react-router-dom";


function EditCategorie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true); // Utilisation de useState pour loader
    const [categorie, setCategorie] = useState({ nom: "" });

    useEffect(() => {
        categorieEditRequest();
    }, [id]);

    const categorieEditRequest = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/categorie/${id}`);
            console.log("Réponse de l'API données:", res.data.categories);
            setCategorie(res.data.categories);
            setLoader(false);
        } catch (error) {
            console.error("Il y a eu une erreur!", error);
            setLoader(false);
        }
    };

    const handleChange = (e) => {
        setCategorie({ ...categorie, nom: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/categorie/edit/${id}`, categorie)
            .then(response => {
                if (response.data.status_code === 200) {
                    alert(response.data.success_msg); // Afficher le message de succès
                    navigate('/voirCategorie'); // Rediriger vers le composant "Voir Catégorie"
                }
                
            })
            .catch(error => {
                console.error("Il y a eu une erreur lors de la mise à jour!", error);
            });
    };

    const renderData = () => {
        
            return loader ? <Loader/> : (<div className="container">
                <form onSubmit={handleSubmit} >
                    <h2>Modifier la Catégorie</h2>
                    <p><input type="text" className="form-control"  value={categorie.nom} onChange={handleChange} /></p>
                    <button className="btn btn-primary">Modifier</button>
                </form>
            </div>
        );
    }

    return (<div>
            {renderData()}
        </div>
    );
}

export default EditCategorie;
