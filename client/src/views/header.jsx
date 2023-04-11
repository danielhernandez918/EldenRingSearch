import React, { useState, useEffect } from 'react';
import axios from "axios"
import {Link} from 'react-router-dom'
import './styles.css';

const Header = () => {
    const [userData, setUserData] = useState(null);

    const logoutHandler = ()=>{
        axios.get(`http://localhost:8000/api/logout`, {withCredentials: true})
        .then(res=> window.location.reload(false))
            .catch()
    }
    
    // useEffect(()=>{
    //     axios.get(`http://localhost:8000/api/cookie`,{withCredentials:true})
    //     .then(res=> {console.log("success") 
    //         setCookie(true) })
    //     .catch(res=> {console.log("No cookie")
    //         setCookie(false) })
    // })

    useEffect(() => {
        axios.get(`http://localhost:8000/api/loggedUser`, { withCredentials: true })
            .then(res => {
            setUserData(res.data);
            })
            .catch(err => {
            console.log(err);
            });
    }, []);

    return (
        <div className='col-12 head'>
            {userData && <p>Welcome, {userData.userName}</p>}
            <div className="rows">
                <h1 className='col-3'><Link className="noLine" to={`/`}>Elden Ring Search</Link></h1>
                <h2 className="rows col-8">
                        <Link className="noLine" to={`/categories`}>Categories</Link>
                        <Link className="noLine" to={`/favorites`}>Favorites</Link>
                        {
                            !userData &&
                            <Link className="noLine" to={`/register`}>Register</Link>
                        }
                        {
                            !userData &&
                            <Link className="noLine mx-4" to={`/login`}>Login</Link>
                        }
                        {
                            userData &&
                            <button className="noBtn" onClick={logoutHandler}>Logout</button>
                        }
                </h2>
            </div>
        </div>
    )
}

export default Header;