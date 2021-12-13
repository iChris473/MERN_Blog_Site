
import './Settings.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../contexts/Context';
import { useContext, useState } from 'react';
import axios from 'axios';

export default function Settings() {
    const {user, dispatch} = useContext(Context);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const PF = "http://localhost:2000/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"});
        const newUser = {
            userID: user._id,
            username,
            password,
            email
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file)
            newUser.profilePic = filename;
            try {
              await axios.post("http://localhost:2000/upload", data)
            } catch (err) {
              
            }
          }
        try {
            const res = await axios.put(`http://localhost:2000/users/update/${user._id}`, newUser);
            setSuccess(true);
            dispatch({type: "UPDATE_SUCCESS", payload: res.data});
            console.log(res.data)
            console.log(dispatch)
        } catch (err) {
            dispatch({type: "UPDATE_FAILURE"})
        }
    } 

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Profile</span>
                    <span className="settingsdeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit} >
                    <label >Profile Picture</label>
                    <div className="settingsPP">
                        <div>
                            <label htmlFor="fileInput">
                                {
                                    user.profilePic || file ?
                                    (<img src={file ? URL.createObjectURL(file) : PF+user.profilePic} className="settingsImg" />) :
                                    (<FontAwesomeIcon icon={faUser} className="userIcon" />)                              
                                }
                            </label>
                            <input type="file" onChange={e => setFile(e.target.files[0])} id="fileInput" style={{ display: "none" }} />
                        </div>
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username}  onChange={e => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={user.email} value={email} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                    <button className="settingsSubmit" type="submit" >Update</button>
                    {success && <span  style={{color:"green", marginTop:"10px", textAlign:"center"}}>profile has been updated</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
