import axios from 'axios';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'

export default function Register() {
    const [username, setUsername] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [error, setError] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        try {
            const res = await axios.post("http://localhost:2000/register", {
                username,
                email,
                password
            });
            res.data && window.location.replace("/login")
        } catch (err) {
           setError(true)
        }
    }
    return (
        <div className="Register">
                <span className="RegisterTitle">
                    Register
                </span>
                <form className="RegisterForm" onSubmit={handleSubmit} >
                    <label>Username</label>
                    <input type="text" placeholder="Enter your username" 
                    onChange={e => (setUsername(e.target.value))} />
                    <label>Email</label>
                    <input type="text" placeholder="Enter your email" 
                     onChange={e => (setEmail(e.target.value))}  />
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" 
                     onChange={e => (setPassword(e.target.value))}  />
                    <button className="RegisterBtn"><Link className="link" to="/register" type="Submit">Register</Link></button>
                </form>
            <button className="registerLoginBtn"><Link className="link" to="/login">Login</Link></button>
            {error && <span style={{color:"#222", marginTop:"10px"}}>Something went wrong</span>}
        </div>
    )
}
