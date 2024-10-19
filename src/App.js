import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./pages/navigation/navigation";
import Footer from "./pages/footer/footer";
import { authContext } from "./pages/helpers/appContex";
import axios from "axios";

function App() {
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        if (token) {
            axios.get('http://localhost:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setUser(res.data);
                setLogged(true);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, []);

    return (
        <authContext.Provider value={{ logged, setLogged, setUser, user }}>
            <Router>
                <div className="App">
                    <Navigation />
                    <Footer />
                </div>
            </Router>
        </authContext.Provider>
    );
}

export default App;
