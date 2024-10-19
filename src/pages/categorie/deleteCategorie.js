import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './deleteCategorie.css'
import axios from "axios";

const DeleteCategorie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categorie, setCategorie]= useState();
    const [showPopup, setShowPopup] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/categorie/delete/${id}`);
            setCategorie(response.data.deleteCat);
            alert(response.data.status_message);
            navigate('/voirCategorie');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la suppression!", error);
        }
    };

    const confirmDelete = () => {
        setShowPopup(true);
    };

    const cancelDelete = () => {
        setShowPopup(false);
    };

    return (
        <div className="container mt-5">
            <button className="btn btn-danger" onClick={confirmDelete}>Continuer le processus</button>
            {showPopup && (
                <div className="popup">
                    <p> {categorie} </p>
                    <p>Voulez-vous vraiment supprimer cette catégorie?</p>
                    <button onClick={handleDelete}>Oui</button>
                    <button onClick={cancelDelete}>Non</button>
                </div>
            )}
        </div>
    );
};

export default DeleteCategorie;
