import Hero from '../../images/heroImg2.jpg';
import './header.css'

const Header = () => {
    return (
        <div className="header">
            <div className="header-titles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img src={Hero} alt="Hero-Image" className="headerImg" />
        </div>
    )
}

export default Header;
