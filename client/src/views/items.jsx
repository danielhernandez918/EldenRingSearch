import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Items = () => {

    const {id} = useParams()
    const [item, setItem] = useState()
    const [cookie, setCookie] = useState()

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        // axios.post(`http://localhost:8000/api/favorites/${userId}`, {withCredentials: true})
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/items/${id}`)
            .then(response=> {console.log(response.data) 
                setItem(response.data) })
            .catch(err => {console.log(err) 
                setItem(err.data) })
        axios.get(`http://localhost:8000/api/cookie`,{withCredentials:true})
            .then(res=> setCookie(true) )
            .catch(res=> setCookie(false) )
    }, [id])

    return (
        <div className="center">
            {item ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            cookie &&
                            <button className="favBtn" value={item.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={item.data.image} />
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