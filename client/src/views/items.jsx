import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Items = () => {

    const {id} = useParams()
    const [item, setItem] = useState()
    const [userData, setUserData] = useState(null);

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        axios.post(`http://localhost:8000/api/users/favorites`, item.data, {withCredentials: true})
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/items/${id}`)
            .then(response=> {console.log(response.data) 
                setItem(response.data) })
            .catch(err => {console.log(err) 
                setItem(err.data) })
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
            {item ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            userData &&
                            <button className="favBtn" value={item.data.id} onClick={() => {favoriteClick(item.data.id)}}>
                                Favorite?
                            </button>
                        }
                        <img src={item.data.image} alt="itemImage"/>
                    </div>
                    <div>
                        <h2>Name: {item.data.name}</h2>
                        <p>Description: {item.data.description}</p>
                        <p>Effect: {item.data.effect}</p>
                        <p>Type: {item.data.type}</p>
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

export default Items;