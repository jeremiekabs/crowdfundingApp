import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Categorie from '../categorie/categorie';
import VoirCategorie from '../categorie/voirCategorie';
import 'bootstrap/dist/css/bootstrap.css';
import EditCategorie from '../categorie/editCategorie';
import DeleteCategorie from '../categorie/deleteCategorie';
import Home from '../Accueil/home';
import Register from '../user/register';
import './navigation.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import Login from '../user/login';
import { authContext } from '../helpers/appContex';
import Logout from '../user/logout';
import Profil from '../profil/profil';
import Projet from '../projet/projet';
import AllProjet from '../projet/allprojet';
import Voirprojet from '../projet/voirprojet';
import Financement from '../projet/financement';

function Navigation() {
    const { logged } = useContext(authContext);
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">PLATEFORME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to="/" className='lien'>Accueil</Link>
                            
                            { logged ? (
                              <>
                                <Link to='/profil' className='lien'>Mon profil</Link>
                                <Link to="/categorie" className='lien'>Créer une catégorie</Link>
                                <Link to="/postuler" className='lien'>Postuler</Link>
                                <Link to="/allprojet" className='lien'>Projet</Link>   
                                <Link to="/voirCategorie" className='lien'>Voir les catégories</Link>
                                <Link to="/logout" className='lien'>Se déconnecter</Link>
                              </>
                            ) : (
                              <>
                                <Link to="/login" className='lien'>Se connecter</Link>
                                <Link to="/register" className='lien'>S'inscrire</Link>
                              </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projet/:id" element={<Voirprojet />} />
                <Route path="/projet/:id/financement/:id" element={<Financement />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/categorie" element={<Categorie />} />
                <Route path="/voirCategorie" element={<VoirCategorie />} />
                <Route path="/voirCategorie/categorie/:id" element={<EditCategorie />} />
                <Route path="/voirCategorie/delete/:id" element={<DeleteCategorie />} />
                <Route path="/postuler" element={<Projet />} />
                <Route path="/allprojet" element={<AllProjet />} />
                <Route path="/allprojet/projet/:id" element={<Voirprojet />} />
                <Route path="/allprojet/projet/:id/financement/:id" element={<Financement />} />
            </Routes>
        </>
    );
}

export default Navigation;
