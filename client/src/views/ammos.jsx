import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Ammos = () => {

    const {id} = useParams()
    const [ammo, setAmmo] = useState()
    const [userData, setUserData] = useState(null);

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        axios.post(`http://localhost:8000/api/users/favorites`, ammo.data, {withCredentials: true})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/ammos/${id}`)
            .then(response=> {console.log(response.data) 
                setAmmo(response.data) })
            .catch(err => {console.log(err) 
                setAmmo(err.data) })
    //[id] should only change when id changes
    }, [id])

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
        <div className="center">
            {ammo ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            userData &&
                            <button className="favBtn" value={ammo.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={ammo.data.image} alt="itemImage"/>
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