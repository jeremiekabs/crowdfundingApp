import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllProjet = () => {
    let navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage]);

    const fetchProjects = (page) => {
        axios.get(`http://localhost:8000/api/projet?page=${page}`)
            .then(response => {
                setProjects(response.data.otherProjects.data);
                setTotalPages(response.data.otherProjects.last_page);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des projets:', error);
            });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container">
            <h2>Projets des candidats</h2>
            <p>Découvrez ici les projets des personnes ayant postulé. Chaque projet est unique et reflète la passion et l'engagement de son créateur.</p>
            <div className="row">
                {projects.map(project => (
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={project.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{project.nom}</h5>
                                <p className="card-text">{project.description.substring(0,100)}...</p>
                                <p className="card-text"><strong>Contact:</strong> {project.contact}</p>
                                <p className="card-text"><strong>Secteur:</strong> {project.categorie.nom}</p>
                                <div className="text-center">
                                <a
                                    href=""
                                    onClick={() => navigate(`projet/${project.id}`)}
                                    className="btn btn-secondary m-1"
                                >
                                    Voir en détail
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>«</button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li className={`page-item ${index + 1 === currentPage ? 'active' : ''}`} key={index}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>»</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AllProjet;
