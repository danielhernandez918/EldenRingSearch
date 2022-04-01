import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import './styles.css';

const Weapons = () => {

    const {id} = useParams()
    const [weapon, setWeapon] = useState()
    const [cookie, setCookie] = useState()

    const favoriteClick = (e) => {
        console.log(e);
        alert(`${e} Favorited`);
        // axios.post(`http://localhost:8000/api/favorites/${userId}`, {withCredentials: true})
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/weapons/${id}?limit=200`)
            .then(response=> {console.log(response.data) 
                setWeapon(response.data) })
            .catch(err => {console.log(err) 
                setWeapon(err.data) })
        axios.get(`http://localhost:8000/api/cookie`,{withCredentials:true})
            .then(res=> setCookie(true) )
            .catch(res=> setCookie(false) )
    },[id])

    return (
        <div className="center">
            {weapon ?
                <div className="rows info">
                    <div className="col-4">
                        {
                            cookie &&
                            <button className="favBtn" value={weapon.data.name} onClick={(e) => {favoriteClick(e.target.value)}}>
                                Favorite?
                            </button>
                        }
                        <img src={weapon.data.image} />
                    </div>
                    <div>
                        <h2>Name: {weapon.data.name}</h2>
                        <p>Description: {weapon.data.description}</p>
                        <p>Category: {weapon.data.category}</p>
                        <p>Weight: {weapon.data.weigth}</p>
                        <div>
                            <p>Armor Damage Types:</p>
                            {weapon.data.attack.length > 0 && weapon.data.attack.map((type, index)=>{
                                return (<p key={index}>{type.name}: {type.amount}</p>)
                            })}
                        </div>
                        <div>
                            <p>Defense Types:</p>
                            {weapon.data.defence.length > 0 && weapon.data.defence.map((type, index)=>{
                                return (<p key={index}>{type.name}: {type.amount}</p>)
                            })}
                        </div>
                        <div>
                            <p>Required Attributes:</p>
                            {weapon.data.requiredAttributes.length > 0 && weapon.data.requiredAttributes.map((type, index)=>{
                                return (<p key={index}>{type.name}: {type.amount}</p>)
                            })}
                        </div>
                        <div>
                            <p>Scales With:</p>
                            {weapon.data.scalesWith.length > 0 && weapon.data.scalesWith.map((type, index)=>{
                                return (<p key={index}>{type.name}: {type.scaling}</p>)
                            })}
                        </div>
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

export default Weapons;