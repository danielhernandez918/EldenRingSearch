import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Incantations = () => {

    const {id} = useParams()
    const [incantation, setIncantations] = useState()
    const [userData, setUserData] = useState(null);

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        axios.post(`http://localhost:8000/api/users/favorites`, incantation.data, {withCredentials: true})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/incantations/${id}`)
            .then(response=> {console.log(response.data) 
                setIncantations(response.data) })
            .catch(err => {console.log(err) 
                setIncantations(err.data) })
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
            {incantation ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            userData &&
                            <button className="favBtn" value={incantation.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={incantation.data.image} alt="itemImage"/>
                    </div>
                    <div>
                        <h2>Name: {incantation.data.name}</h2>
                        <p>Description: {incantation.data.description}</p>
                        <p>Type: {incantation.data.type}</p>
                        <p>Cost: {incantation.data.cost}</p>
                        <p>Slots: {incantation.data.slots}</p>
                        <p>Effects: {incantation.data.effects}</p>
                        <p>Attack Damage Types:
                            {incantation.data.requires.length > 0 && incantation.data.requires.map((type, index)=>{
                                return (<li key={index}>{type.name}: {type.amount}</li>)
                            })}
                        </p>
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

export default Incantations;