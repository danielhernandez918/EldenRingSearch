import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const AshesOfWar = () => {

    const {id} = useParams()
    const [ashes, setAshes] = useState()
    const [userData, setUserData] = useState(null);

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        axios.post(`http://localhost:8000/api/users/favorites`, ashes.data, {withCredentials: true})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/ashes/${id}`)
            .then(response=> {console.log(response.data) 
                setAshes(response.data) })
            .catch(err => {console.log(err) 
                setAshes(err.data) })
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
            {ashes ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            userData &&
                            <button className="favBtn" value={ashes.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={ashes.data.image} alt="itemImage"/>
                    </div>
                    <div>
                        <h2>Name: {ashes.data.name}</h2>
                        <p>Description: {ashes.data.description}</p>
                        <p>Affinity: {ashes.data.affinity}</p>
                        <p>Skill: {ashes.data.skill}</p>
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

export default AshesOfWar;