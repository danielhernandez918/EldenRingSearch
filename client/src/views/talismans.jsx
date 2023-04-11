import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Talismans = () => {

    const {id} = useParams()
    const [talisman, setTalismans] = useState()
    const [userData, setUserData] = useState(null);

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        axios.post(`http://localhost:8000/api/users/favorites`, talisman.data, {withCredentials: true})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/talismans/${id}`)
            .then(response=> {console.log(response.data) 
                setTalismans(response.data) })
            .catch(err => {console.log(err) 
                setTalismans(err.data) })
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
            {talisman ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            userData &&
                            <button className="favBtn" value={talisman.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={talisman.data.image} alt="itemImage"/>
                    </div>
                    <div>
                        <h2>Name: {talisman.data.name}</h2>
                        <p>Description: {talisman.data.description}</p>
                        <p>Effect: {talisman.data.effect}</p>
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

export default Talismans;