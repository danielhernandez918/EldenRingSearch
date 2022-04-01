import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom'
import './styles.css';

const Results = () => {
    const {type} = useParams();
    const {name} = useParams()
    const [items, setList] = useState([]);
    const history = useHistory();
    const handleClick = (e) => {
        console.log(type)
        console.log(e)
        history.push(`/${type}/${e}`)
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/${type}?name=${name}`)
            .then(response=> {console.log(response.data.data)
                console.log(type)
                console.log(name)
                setList(response.data.data) })
            .catch(err => {console.log(err) 
                })
    }, [type, name])

    return (
        <div>
            { items.length > 0 ?
                <div className="list">
                    <h1>Search Results</h1>
                    {items.length > 0 && items.map((item, index)=>{
                        return (<option key={index} value={item.id} onClick={e=>handleClick(e.target.value)}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</option>)
                    })}
                </div>:
                <div className="center">
                    <h1>No Results Found!</h1>
                    <img className="maidenless" src={`https://i.kym-cdn.com/photos/images/original/002/324/232/908.png`}   alt="maidenless?"/>
                </div>
            }
        </div>
    )
}

export default Results;