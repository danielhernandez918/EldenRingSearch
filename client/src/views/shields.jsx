import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Shields = () => {

    const {id} = useParams()
    const [shield, setShield] = useState()
    const [userData, setUserData] = useState(null);

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        axios.post(`http://localhost:8000/api/users/favorites`, shield.data, {withCredentials: true})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/shields/${id}`)
            .then(response=> {console.log(response.data) 
                setShield(response.data) })
            .catch(err => {console.log(err) 
                setShield(err.data) })
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
            {shield ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            userData &&
                            <button className="favBtn" value={shield.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={shield.data.image} alt="itemImage"/>
                    </div>
                    <div>
                        <h2>Name: {shield.data.name}</h2>
                        <p>Description: {shield.data.description}</p>
                        <p>Category: {shield.data.category}</p>
                        <p>Weight: {shield.data.weigth}</p>
                        <p>Attack Damage Types:
                            {shield.data.attack.length > 0 && shield.data.attack.map((type, index)=>{
                                return (<li key={index}>{type.name}: {type.amount}</li>)
                            })}
                        </p>
                        <p>Defense Types:
                            {shield.data.defence.length > 0 && shield.data.defence.map((type, index)=>{
                                return (<li key={index}>{type.name}: {type.amount}</li>)
                            })}
                        </p>
                        <p>Required Attributes:
                            {shield.data.requiredAttributes.length > 0 && shield.data.requiredAttributes.map((type, index)=>{
                                return (<li key={index}>{type.name}: {type.amount}</li>)
                            })}
                        </p>
                        <p>Scales With:
                            {shield.data.scalesWith.length > 0 && shield.data.scalesWith.map((type, index)=>{
                                return (<li key={index}>{type.name}: {type.scaling}</li>)
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

export default Shields;