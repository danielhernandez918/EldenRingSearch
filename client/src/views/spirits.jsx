import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Spirits = () => {

    const {id} = useParams()
    const [spirit, setSpirits] = useState()
    const [userData, setUserData] = useState(null);

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        axios.post(`http://localhost:8000/api/users/favorites`, spirit.data, {withCredentials: true})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/spirits/${id}`)
            .then(response=> {console.log(response.data) 
                setSpirits(response.data) })
            .catch(err => {console.log(err) 
                setSpirits(err.data) })
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
            {spirit ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            userData &&
                            <button className="favBtn" value={spirit.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={spirit.data.image} alt="itemImage"/>
                    </div>
                    <div>
                        <h2>Name: {spirit.data.name}</h2>
                        <p>Description: {spirit.data.description}</p>
                        <p>FP Cost: {spirit.data.fpCost}</p>
                        <p>HP Cost: {spirit.data.hpCost}</p>
                        <p>Effect: {spirit.data.effect}</p>
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

export default Spirits;