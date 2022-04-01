import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Spirits = () => {

    const {id} = useParams()
    const [spirit, setSpirits] = useState()
    const [cookie, setCookie] = useState()

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        // axios.post(`http://localhost:8000/api/favorites/${userId}`, {withCredentials: true})
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/spirits/${id}`)
            .then(response=> {console.log(response.data) 
                setSpirits(response.data) })
            .catch(err => {console.log(err) 
                setSpirits(err.data) })
        axios.get(`http://localhost:8000/api/cookie`,{withCredentials:true})
            .then(res=> setCookie(true) )
            .catch(res=> setCookie(false) )
    }, [id])

    return (
        <div className="center">
            {spirit ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            cookie &&
                            <button className="favBtn" value={spirit.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={spirit.data.image} />
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