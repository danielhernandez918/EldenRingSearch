import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Ammos = () => {

    const {id} = useParams()
    const [ammo, setAmmo] = useState()
    const [cookie, setCookie] = useState()

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        // axios.post(`http://localhost:8000/api/favorites/${userId}`, {withCredentials: true})
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/ammos/${id}`)
            .then(response=> {console.log(response.data) 
                setAmmo(response.data) })
            .catch(err => {console.log(err) 
                setAmmo(err.data) })
        axios.get(`http://localhost:8000/api/cookie`,{withCredentials:true})
            .then(res=> setCookie(true) )
            .catch(res=> setCookie(false) )
    }, [id])

    return (
        <div className="center">
            {ammo ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            cookie &&
                            <button className="favBtn" value={ammo.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={ammo.data.image} />
                    </div>
                    <div>
                        <h2>Name: {ammo.data.name}</h2>
                        <p>Description: {ammo.data.description}</p>
                        <p>Damage Type: {ammo.data.type}</p>
                        {
                            ammo.data.passive=== "-"?
                            <p>Passive Aility: None</p>:
                            <p>Passive Ability: {ammo.data.passive}</p>
                        }
                    </div>
                </div>:
                <div>
                    <h1>Does Not Exist!</h1>
                    <img className="maidenless" src={`https://i.kym-cdn.com/photos/images/original/002/324/232/908.png`}   alt="maidenless?"/>
                </div>
            }
        </div>
    )
}

export default Ammos;