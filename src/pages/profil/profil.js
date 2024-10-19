import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Profil = () => {
    let navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('user_id');

        if (userId) {
            fetchProjects(userId, currentPage);
            fetchUserEmail();
        }
    }, [currentPage]);

    const fetchProjects = (userId, page) => {
        axios.get(`http://localhost:8000/api/projet?user_id=${userId}&page=${page}`)
            .then(response => {
                console.log(response.data);
                if (response.data && response.data.projects) {
                    setProjects(response.data.projects.data);
                    setTotalPages(response.data.projects.last_page);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const fetchUserEmail = () => {
        axios.get('http://localhost:8000/api/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_token')}`
            }
        })
        .then(response => {
            setUserEmail(response.data.email);
            setUserName(response.data.name);
        })
        .catch(error => console.error('Error:', error));
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center p-3 mb-4 bg-secondary text-white rounded">
                <div className="d-flex align-items-center">
                    <div>
                        <h4 className="mb-0">Ici, vous visualisez vos propres projets et evaluez leurs pertinences</h4>
                        <p className="mb-0">Vous : {userName}</p>
                        <p className="mb-0">Email : {userEmail}</p>
                    </div>
                </div>
                <button className="btn btn-light">
                    <FaPlus className="me-2" />
                    Lancer une campagne
                </button>
            </div>
            <div className="row">
                {projects.map(project => (
                    <div className="col-md-4 mb-4" key={project.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{project.nom}</h5>
                                <p className="card-text">{project.description.substring(0, 100)}...</p>
                                <a
                                    href="#"
                                    onClick={() => navigate(`projet/${project.id}`)}
                                    className="btn btn-secondary m-1"
                                >
                                    Voir en détail
                                </a>
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

export default Profil;
