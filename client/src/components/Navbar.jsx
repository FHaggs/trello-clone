import { Link } from "react-router-dom";
import '../App.css';


const NavBar = () => {
    return (
        <div className='navbar'>
            <span className='logo'>Fam</span>
            <ul className='list'>
                <li className="listItem"><Link to="/">Board</Link></li>
                <li className="listItem"><Link to="/clients">Clientes</Link></li>
                <li className='listItem'>
                    <img src="https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="Avatar" className="avatar" />
                </li>
            </ul>
        </div>


    )
}

export default NavBar;
