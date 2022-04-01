import axios from 'axios'
import React, {useEffect} from 'react'
import './styles.css';

const Cookie = () => {
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/cookie`,{withCredentials:true})
            .then(res=>console.log("success"))
            .catch()
    })
    return (
        <div>
            
        </div>
    )
}

export default Cookie