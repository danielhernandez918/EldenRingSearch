import React, {useState} from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom'
import './styles.css';


const Login = () => {
    const [errors, setErrors] = useState([]);
    const history = useHistory()
    const [user, setUser] = useState({
        email:"",
        password:"",
    })

    const changeHandler =(e) =>{
        let {name, value} = e.target
        setUser({
            ...user,
            [name] : value
        })
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/login`, user, {withCredentials:true})
            .then(res=> {history.push("/")
                window.location.reload(false)})
            .catch(err=>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }


    return (
            <div className='center'>
                <form onSubmit={submitHandler}>
                    <div>
                        <label className='mx-2'>Email:</label>
                        <input className="regFont" type="text" name="email" value={user.email} onChange={changeHandler} />
                    </div>
                    <div className='my-1'>
                        <label className='mx-2'>Password:</label>
                        <input className="fontBack" type="password" name="password" value={user.password} onChange={changeHandler} />
                    </div>
                    <button className="logBtn"> Login </button>
                </form>
                {
                    errors.map((err,i) => (
                        <p key={i} style={{color:"red"}}>{err}</p>
                    ))
                }
            </div>
    )
}

export default Login