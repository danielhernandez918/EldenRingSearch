import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Armors = () => {
    const {id} = useParams()
    const [armor, setArmor] = useState()
    const [userData, setUserData] = useState(null);

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        axios.post(`http://localhost:8000/api/users/favorites`, armor.data, {withCredentials: true})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/armors/${id}`)
            .then(response=> {console.log(response.data) 
                setArmor(response.data) })
            .catch(err => {console.log(err) 
                setArmor(err.data) })
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
            {armor ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            userData &&
                            <button className="favBtn" value={armor.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={armor.data.image} alt="itemImage"/>
                    </div>
                    <div>
                        <h2>Name: {armor.data.name}</h2>
                        <p>Description: {armor.data.description}</p>
                        <p>Category: {armor.data.category}</p>
                        <p>Weight:{armor.data.weigth}</p>
                        <p>Damage Negations:
                            {armor.data.dmgNegation.length > 0 && armor.data.dmgNegation.map((type, index)=>{
                                return (<li key={index}>{type.name}: {type.amount}</li>)
                            })}
                        </p>
                        <p>Resistances:
                            {armor.data.resistance.length > 0 && armor.data.resistance.map((type, index)=>{
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

export default Armors;