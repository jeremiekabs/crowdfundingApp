import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Voirprojet() {
    
    let navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/projet/${id}`)
            .then(response => {
                setProject(response.data.projectId);
            })
            .catch(error => {
                setError("Project not found");
            });
    }, [id]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!project) {
        return <div className="text-center my-5">Loading...</div>;
    }

    const renderFile = (file) => {
        const fileExtension = file.split('.').pop().toLowerCase();
        if (fileExtension === 'pdf') {
            return (
                <div className="embed-responsive embed-responsive-16by9">
                    <embed src={`http://localhost:8000/images/${file}`} className="embed-responsive-item" type="application/pdf" />
                </div>
            );
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            return <img src={`http://localhost:8000/images/${file}`} alt="Project File" className="img-thumbnail" />;
        } else {
            return <p>Le format non supporté</p>;
        }
    };
    const formattedDate = new Date(project.created_at).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="container mt-5">
            <div className="card mb-5">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h1 className="card-title">{project.nom}</h1>
                    <a
                    href=""
                    onClick={() => navigate(`financement/${project.id}`)}
                    className="btn btn-success m-1"
                    >
                        Soutenir ce projet
                    </a>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p className="card-text"><strong>Description:</strong> {project.description}</p>
                            <p className="card-text"><strong>Date de création:</strong> {formattedDate}</p>
                            <p className="card-text"><strong>Utilisateur:</strong> {project.user.name}</p>
                            <p className="card-text"><strong>Catégorie:</strong> {project.categorie.nom}</p>
                            <p className="card-text"><strong>Phone:</strong> {project.contact}</p>
                            <p className="card-text"><strong>Email:</strong> {project.user.email}</p>
                            <h1 className="card-text"><strong>Montant demandé : </strong>${project.montant_d}</h1>
                        </div>
                        <div className="col-md-6 text-center">
                            {project.file && (
                                <div className="mt-3">
                                    <h5>Fichier:</h5>
                                    {renderFile(project.file)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Voirprojet;
