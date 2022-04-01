import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Talismans = () => {

    const {id} = useParams()
    const [talisman, setTalismans] = useState()
    const [cookie, setCookie] = useState()

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        // axios.post(`http://localhost:8000/api/favorites/${userId}`, {withCredentials: true})
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/talismans/${id}`)
            .then(response=> {console.log(response.data) 
                setTalismans(response.data) })
            .catch(err => {console.log(err) 
                setTalismans(err.data) })
        axios.get(`http://localhost:8000/api/cookie`,{withCredentials:true})
            .then(res=> setCookie(true) )
            .catch(res=> setCookie(false) )
    }, [id])

    return (
        <div className="center">
            {talisman ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            cookie &&
                            <button className="favBtn" value={talisman.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={talisman.data.image} />
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