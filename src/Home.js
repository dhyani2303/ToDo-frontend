import React from "react";
import  {MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const navigate=useNavigate();
    const handleSubmit=()=>{
        localStorage.clear();
        navigate('/login');
    }
    return(
        <>
        <p>Welcome!</p>
        <input type="submit" className="submit" value="Logout" onClick={handleSubmit} />  
        </>
    )
}

export default Home;