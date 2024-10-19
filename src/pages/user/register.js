import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      try {
        const response = await axios.post('http://localhost:8000/api/register', { name, email, password });
        if (response.data.status_code === 200) {
          setMessage(response.data.success_msg);
          setName('');
          setEmail('');
          setPassword('');
        } else {
          setMessage('La catégorie existe déjà'); // Adjust message if needed
        }
      } catch (error) {
        setMessage('Une erreur est survenue');
      }
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  return (
    <section>
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <form onSubmit={handleRegistration} className="card p-4">
          <h2 className="card-title text-center mb-4">Créez votre compte</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Entrez votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrez votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            S'inscrire
          </button>
          {message && <div className="mt-3 text-danger">{message}</div>}
        </form>
      </div>
    </section>
  );
}

export default Register;
