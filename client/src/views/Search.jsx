import React, { useState, useEffect } from 'react'
import {useHistory} from "react-router-dom"
import './styles.css';


const Search = () => {
    const [type, setType] = useState()
    const [name, setName] = useState("")
    const history = useHistory();
    const [refresh, setRefresh] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/search/${type}/${name}`)
    }

    useEffect(() => {
        setName("");
    }, [refresh])

    return (
            <div className="center">
                <form onSubmit={handleSubmit}>
                    <label className='mx-2'>Select for:</label>
                    <select className="fontBack" name="type" id="type" value={type} onChange={e=>setType(e.target.value)}>
                        <option hidden>Choose a type</option>
                        <option value="ammos">Ammos</option>
                        <option value="armors">Armors</option>
                        <option value="ashes">Ashes of War</option>
                        <option value="items">Items</option>
                        <option value="incantations">Incantations</option>
                        <option value="shields">Shields</option>
                        <option value="sorceries">Sorceries</option>
                        <option value="spirits">Spirits</option>
                        <option value="talismans">Talismans</option>
                        <option value="weapons">Weapons</option>
                    </select>
                    
                    <label className="mx-2">Name:</label>
                    <input className="fontBack" type="text" name="name" value={name} 
                                onChange={e=>setName(e.target.value)}
                                placeholder= "Type Here"/>
                    <input className="searchBtn" type="submit" value="Search"/>
                </form>
                        <div className="welcome">
                            <h1 >Welome Tarnished!</h1>
                            <h1>Start Searching For Your Items!</h1>
                        </div>
            </div>
    )
}

export default Search;

