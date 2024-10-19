import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './home.css';

const Home = () => {

    let navigate = useNavigate();
    const [latestProjects, setLatestProjects] = useState([]);

    useEffect(() => {
        const fetchLatestProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/projet');
                setLatestProjects(response.data.latestProjects);
            } catch (error) {
                console.error('Erreur lors de la récupération des projets:', error);
            }
        };

        fetchLatestProjects();
    }, []);

    return (
        <div>
            <main id="main">
            <section id="pricing" className="pricing py-5">
    <div className="container">
        <div className="section-title text-center mb-5">
            <h2>Soutenez vos projets préférés</h2>
            <p>Rejoignez notre communauté et contribuez à la réalisation de projets innovants. Chaque don compte !</p>
        </div>
        <div className="row">
            {latestProjects.map(latestProject => (
                <div className="col-lg-3 col-md-6 mb-4" key={latestProject.id}>
                    <div className="card h-100">
                        <div className="card-body">
                            <h3 className="card-title">{latestProject.nom}</h3>
                            <p className="card-text">Porteur de projet : {latestProject.user.name}</p>
                            <p className="card-text">
                                {latestProject.description.substring(0, 100)}...
                            </p>
                            <p className="card-text">Domaine : {latestProject.categorie.nom}</p>
                        </div>
                        <div className="card-footer text-center">
                            <a
                                href=""
                                onClick={() => navigate(`/projet/${latestProject.id}`)}
                                className="btn btn-secondary"
                            >
                                Voir en détail
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>


                <section id="pricing" className="pricing">

                    <div className="container">
                        <div className="section-title">
                            <h2>Des projets qui ont vu le jour grâce à vous</h2>
                            <p>Découvrez quelques-uns des projets que nous avons soutenus ensemble.</p>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                              <img src={`${process.env.PUBLIC_URL}/images/argent.jpg`} alt="Projets financés" className="img-fluid rounded" />
                            </div>
                            <div className="col-md-6">
                                <ul className="project-list">
                                    <li><strong>Projet A :</strong> [Description courte du projet]</li>
                                    <li><strong>Projet B :</strong> [Description courte du projet]</li>
                                    <li><strong>Projet C :</strong> [Description courte du projet]</li>
                                    <li><strong>Projet D :</strong> [Description courte du projet]</li>
                                    <li><strong>Projet F :</strong> [Description courte du projet]</li>
                                    <li><strong>Projet G :</strong> [Description courte du projet]</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="call-to-action" className="call-to-action">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 text-center text-lg-left">
                                <h3>Rejoignez notre communauté et changez le monde, un projet à la fois.</h3>
                            </div>
                            <div className="col-lg-3 text-center text-lg-right">
                                <a href="#" className="btn btn-primary">Soutenir un projet</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
