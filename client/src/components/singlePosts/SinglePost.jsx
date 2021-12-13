import './SinglePost.css';
import SingleImage from '../../images/singleImg.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../contexts/Context';

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`http://localhost:2000/post/${path}`);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc)
        }; 
        getPost()
    }, [path])
    const PF = "http://localhost:2000/images/";
    const {user} = useContext(Context);

    const handleDelete = async (e) => {
        try {
            await axios.delete(`http://localhost:2000/post/delete/${post._id}`, {data: {username: user.username}});
            window.location.replace("/")
        } catch (err) {
            
        }
    }
    const handleUpdate = async () => {
        const res = await axios.put(`http://localhost:2000/post/update/${post._id}`, {username: user.username, title, desc});
        console.log(res)
        setUpdateMode(false)
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (<img src={PF + post.photo} alt="" className="sp-img" />)}
                {updateMode ? <input type="text" value={title} autoFocus className="singlePostTitleInput" onChange={e => setTitle(e.target.value)} /> :
                (
                <h1 className="singlePostTitle">
                    {title}
                    {post.username === user?.username && (<div className="singlePostEdit">
                        <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => setUpdateMode(true)} />
                        <FontAwesomeIcon icon={faTrash} className="edit-icon" onClick={handleDelete} />
                    </div>)}
                </h1>
                )}
                <div className="singlePostInfo">
                    <Link to={`/?user=${post.username}`} className="link" >
                     <div className="singlePostAuthor">Author: <b>{post.username}</b></div>
                    </Link>
                        <div className="singlePostDate">{new Date(post.createdAt).toDateString()}</div>
                    </div>
                {
                    updateMode ? <textarea type="text" value={desc} className="singlePostDescInput" onChange={e => setDesc(e.target.value)} ></textarea> : (
                        <p className="singlePostDesc">
                            {desc}
                        </p>
                    )}
                    {
                        updateMode && (<button className="updateBtn" onClick={handleUpdate}>Update</button>)
                    }
                    
            </div>
        </div>
    )
}
