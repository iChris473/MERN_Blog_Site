import './sidebar.css';
import TechGuy from '../../images/Techguy.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [cats, setCats] = useState([]);
    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get('http://localhost:2000/categories');
            setCats(res.data)
        }
        getCats()
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="s-title">ABOUT ME</span>
                <img src={TechGuy} alt="about-me-img" className="s-img" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero dignissimos aut beatae corporis non at.</p>
            </div>
            <div className="sidebarItem">
                <span className="s-title">CATEGORIES</span>
                <ul className="s-list">
                    {cats.map(c => (
                        <Link to={`/?cat=${c.name}`} >
                            <li className="s-list-item">{c.name}</li>   
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="s-title">FOLLOW US</span>
                <div className="s-social">
                    <FontAwesomeIcon icon={faFacebook} className="s-icon" />
                    <FontAwesomeIcon icon={faTwitter} className="s-icon" />
                    <FontAwesomeIcon icon={faInstagram} className="s-icon" />
                    <FontAwesomeIcon icon={faWhatsapp} className="s-icon" />
                </div>
            </div>
        </div>
  )
}

export default Sidebar;
