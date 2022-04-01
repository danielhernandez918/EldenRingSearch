import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom'
import './styles.css'


const CatList = () => {
    
    const {type} = useParams();
    const typeUpper = type.toUpperCase();
    const[items,setList] = useState([]);
    const history = useHistory();
    const [refresh, setRefresh] = useState(false)
    const handleClick = (e) => {
        console.log(e)
        history.push(`/list/${type}/${e}`)
        setRefresh(!refresh);
    }

    useEffect(() => {
        axios.get(`https://eldenring.fanapis.com/api/${type}?limit=500`)
            .then(response=> {console.log(response.data.data) 
                setList(response.data.data) })
            .catch(err => {console.log(err) 
                })
    }, [refresh])

    return (
            <div className="list">
                <h1>{typeUpper}</h1>
                {items.length > 0 && items.map((item, index)=>{
                    return (<option key={index} value={item.id} onClick={e=>handleClick(e.target.value)}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</option>)
                })}
            </div>
    )
}

export default CatList;