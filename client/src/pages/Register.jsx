import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
const Register = ()=>{
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    })
    const [err, setError] = useState(null)
    const navigate = useNavigate();
    const handleChange=e=>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit= async e=>{
        e.preventDefault();
        try{
            await axios.post("/api/auth/register", inputs)
            navigate('/login');
            // console.log(res);
        }catch(err){
            setError(err.response.data);
        }
    }

    // console.log(inputs);
    return( 
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <input required type="text" name='username' placeholder='username' onChange={handleChange}/>
                <input required type="email" name="email" placeholder='email' onChange={handleChange}/>
                <input required type="password" name="password" placeholder='password' onChange={handleChange}/>
                <button onClick={handleSubmit}>Submit</button>
                {err && <p>{err}</p>}
                <span>Already an user? <Link to='/login'>Login</Link></span>
            </form>
        </div>
    )
}

export default Register