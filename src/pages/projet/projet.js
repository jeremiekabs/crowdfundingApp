import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Projet = () => {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        contact: '',
        montant_d: '',
        categorie_id: '',
        id_user: localStorage.getItem('user_id') || '' // Récupérer l'ID de l'utilisateur depuis le localStorage
    });
    const fileInputRef = useRef(null);

    useEffect(() => {
        selectCategorie();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const selectCategorie = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/categorie");
            setCategories(res.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', file);
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        try {
            const response = await axios.post("http://localhost:8000/api/projet/create", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            });
            if (response.data.statut === 200) {
                setMessage(response.data.success_msg);
                setFormData({
                    nom: '',
                    description: '',
                    contact: '',
                    montant_d: '',
                    categorie_id: '',
                    id_user: localStorage.getItem('user_id') || '' // Réinitialiser avec l'ID de l'utilisateur
                });
                setFile(null);
                fileInputRef.current.value = null; // Réinitialiser le champ de fichier
            } else {
                setMessage('Submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 mb-5">
                    <h2>Rejoignez notre communauté de projets innovants!</h2>
                    <p>Vous avez une idée brillante? Soumettez votre projet et obtenez le soutien dont vous avez besoin pour le réaliser. Nous sommes là pour vous aider à chaque étape.</p>
                    <p>Ne manquez pas cette opportunité de transformer vos idées en réalité. Postulez dès maintenant et faites partie de notre réseau de créateurs passionnés.</p>
                    <img src="/images/innovation.jpg" alt="Innovation" className="img-fluid mt-3" />
                </div>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="p-4 border rounded">
                        <div className="mb-3">
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input type="text" className="form-control" id="nom" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom du projet" required />
                            <div className="form-text">Entrez le nom du projet.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Description du projet" required />
                            <div className="form-text">Entrez une brève description du projet.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact" className="form-label">Contact</label>
                            <input type="text" className="form-control" id="contact" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" required />
                            <div className="form-text">Entrez les informations de contact.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="montant_d" className="form-label">Montant</label>
                            <input type="number" className="form-control" id="montant_d" name="montant_d" value={formData.montant_d} onChange={handleChange} placeholder="Montant" required />
                            <div className="form-text">Entrez le montant demandé.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categorie_id" className="form-label">Catégorie</label>
                            <select className="form-control" id="categorie_id" name="categorie_id" value={formData.categorie_id} onChange={handleChange} required>
                                <option value="">Sélectionnez une catégorie...</option>
                                {categories.map(categorie => (
                                    <option key={categorie.id} value={categorie.id}>{categorie.nom}</option>
                                ))}
                            </select>
                            <div className="form-text">Sélectionnez la catégorie du projet.</div>
                        </div>
                        <div className="mb-3">
                            <input type="hidden" className="form-control" id="id_user" name="id_user" value={formData.id_user} onChange={handleChange} placeholder="ID de l'utilisateur" required readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">Fichier</label>
                            <input type="file" className="form-control" id="file" ref={fileInputRef} onChange={handleFileChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Envoyer</button>
                        {message && <p>{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Projet;
