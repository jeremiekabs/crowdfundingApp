import React, { useContext } from "react";
import { authContext } from "../helpers/appContex";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setLogged, setUser } = useContext(authContext);
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    setLogged(false);
    setUser(undefined);
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Déconnexion
    </button>
  );
}

export default Logout;
