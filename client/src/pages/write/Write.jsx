import './write.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import writeImg from '../../images/heroImg.jpg'
import { useContext, useState } from 'react';
import { Context } from '../../contexts/Context';
import axios from 'axios';

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const {user} = useContext(Context)

  const handleSubmit = async (e) => {
      e.preventDefault();
      const newPost = {
        username: user.username,
        title,
        desc
      }
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file)
        newPost.photo = filename;
        try {
          await axios.post("http://localhost:2000/upload", data)
        } catch (err) {
          
        }
      }
      try {
        const res = await axios.post("http://localhost:2000/post", newPost);
        window.location.replace(`/post/${res.data._id}`)
      } catch (err) {
        
      }
  }
  return (
    <div className="write">
      {file && (<img src={URL.createObjectURL(file)} alt="write" className="writeImg" />)}

      <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
              <label htmlFor="fileInput">
              <FontAwesomeIcon icon={faPlus} className="writeIcon"/>
              </label>
              <input type="file" id="fileInput" onChange={e => setFile(e.target.files[0])} style={{display: "none"}} />
              <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="writeFormGroup">
              <textarea type="text" placeholder="Tell your story..." className="writeInput writeText" onChange={e => setDesc(e.target.value)} ></textarea>
          </div>
          <button className="submitBtn" type="submit" >Publish</button>
      </form>
    </div>
  )
}
