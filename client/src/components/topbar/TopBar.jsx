import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './topBar.css';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../contexts/Context';

const TopBar = () => {
  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:2000/images/";
  
  const handleClick = () => {
    dispatch({type:"LOGOUT"})
  }
  return (
    <div className="top">
      <div className="top-left">
      <FontAwesomeIcon icon={faFacebook} className="icons"/>
      <FontAwesomeIcon icon={faTwitter} className="icons" />
      <FontAwesomeIcon icon={faInstagram} className="icons" />
      <FontAwesomeIcon icon={faWhatsapp} className="icons"/>
      </div>
      <div className="top-center">
              <ul className="top-list">
                  <li className="top-item"><Link className="link" to="/">HOME</Link></li>
                  <li className="top-item"><Link className="link" to="/">ABOUT</Link></li>
                  <li className="top-item"><Link className="link" to="/">CONTACT</Link></li>
                  <li className="top-item"><Link className="link" to="/write">WRITE</Link></li>
                  <li className="top-item"><Link className="link" to="/login" onClick={handleClick} >{user && 'LOG OUT'}</Link></li>
              </ul>
      </div>
      <div className="top-right">
        {
          user ?
           (<Link className="link" to="/settings"> {user.profilePic ? <img src={PF+user.profilePic} className="hero-img" /> :  <FontAwesomeIcon icon={faUser} className="settingsIcon" />} </Link>) : 
  
          (<ul className="top-list">
             <li className="top-item"> <Link className="link" to="/login">LOG IN</Link> </li>
             <li className="top-item"> <Link className="link" to="/register">REGISTER</Link> </li>
           </ul>)
        }

          <FontAwesomeIcon icon={faSearch} className="searchIcon" />
      </div>
    </div>
  )
}

export default TopBar
