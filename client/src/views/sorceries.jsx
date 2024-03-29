import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Sorceries = () => {

    const {id} = useParams()
    const [sorcery, setSorceries] = useState()
    const [userData, setUserData] = useState(null);

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        axios.post(`http://localhost:8000/api/users/favorites`, sorcery.data, {withCredentials: true})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/sorceries/${id}`)
            .then(response=> {console.log(response.data) 
                setSorceries(response.data) })
            .catch(err => {console.log(err) 
                setSorceries(err.data) })
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
            {sorcery ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            userData &&
                            <button className="favBtn" value={sorcery.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={sorcery.data.image} alt="itemImage"/>
                    </div>
                    <div>
                        <h2>Name: {sorcery.data.name}</h2>
                        <p>Description: {sorcery.data.description}</p>
                        <p>Type: {sorcery.data.type}</p>
                        <p>Cost: {sorcery.data.cost}</p>
                        <p>Slots: {sorcery.data.slots}</p>
                        <p>Effects: {sorcery.data.effects}</p>
                        <p>Attack Damage Types:
                            {sorcery.data.requires.length > 0 && sorcery.data.requires.map((type, index)=>{
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

export default Sorceries;