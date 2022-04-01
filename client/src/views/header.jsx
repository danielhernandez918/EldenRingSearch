import React, { useState, useEffect } from 'react';
import axios from "axios"
import {useHistory, Link} from 'react-router-dom'
import './styles.css';

const Header = () => {
    const history = useHistory()
    const [cookie, setCookie] = useState()

    const logoutHandler = ()=>{
        axios.get(`http://localhost:8000/api/logout`, {withCredentials: true})
        .then(res=> window.location.reload(false))
            .catch()
    }
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/cookie`,{withCredentials:true})
        .then(res=> {console.log("success") 
            setCookie(true) })
        .catch(res=> {console.log("No cookie")
            setCookie(false) })
    })

    return (
        <div className='col-12 head'>
            <div className="rows">
                <h1 className='col-3'><Link className="noLine" to={`/`}>Elden Ring Search</Link></h1>
                <h2 className="rows col-8">
                        <Link className="noLine" to={`/categories`}>Categories</Link>
                        <Link className="noLine" to={`/login`}>Favorites</Link>
                        {
                            !cookie &&
                            <Link className="noLine" to={`/register`}>Register</Link>
                        }
                        {
                            !cookie &&
                            <Link className="noLine mx-4" to={`/login`}>Login</Link>
                        }
                        {
                            cookie &&
                            <button className="noBtn" onClick={logoutHandler}>Logout</button>
                        }
                </h2>
            </div>
        </div>
    )
}

export default Header;