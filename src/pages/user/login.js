import React, { useContext, useState } from "react";
import { authContext } from "../helpers/appContex";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const { setLogged, setUser } = useContext(authContext);
    let navigate = useNavigate();
    
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (email !== '' && password !== '') {
            await axios.post('http://localhost:8000/api/login', {
                email: email,
                password: password
            }).then((res) => {
                if (res.data.status === 200) {
                    const token = res.data.token;
                    const userId = res.data.userId; // Récupérer l'ID de l'utilisateur
                    localStorage.setItem('user_token', token);
                    localStorage.setItem('user_id', userId); // Stocker l'ID de l'utilisateur
                    setLogged(true);
                    setUser(res.data.user);
                    navigate('/profil');
                } else if (res.data.status === 401) {
                    setMessage('Informations fournies sont incorrectes');
                    setPassword('');
                }
            }).catch((err) => {
                console.error(err);
            });
        }
    };
    

    return (
        <section>
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <form onSubmit={handleLogin} className="card p-4">
                    <h2 className="card-title text-center mb-4">Connectez-vous</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Adresse Email</label>
                        <input type="email" required className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Se connecter
                    </button>
                    {message && <p className="mt-3">{message}</p>}
                </form>
            </div>
        </section>
    );
}

export default Login;
