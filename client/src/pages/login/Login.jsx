
import { Link } from 'react-router-dom';
import './login.css';
import {Context} from '../../contexts/Context';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useContext } from 'react';


export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const {dispatch, isFetching} = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const username = userRef.current.value
            const password = passwordRef.current.value
            const res = await axios.post("http://localhost:2000/login", {
                username,
                password
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" })
        }
    }
    
        return (
        <div className="login">
                <span className="loginTitle">
                    Login
                </span>
                <form className="loginForm" onSubmit={handleSubmit} >
                    <label>username</label>
                    <input type="text" placeholder="Enter your username" ref={userRef} />
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" ref={passwordRef} />
                    <button className="loginBtn"  disabled={isFetching}><Link className="link" to="/login">Login</Link></button>
                </form>
            <button className="registerBtn"><Link className="link" to="/register" >Register</Link></button>
        </div>
    )
}
