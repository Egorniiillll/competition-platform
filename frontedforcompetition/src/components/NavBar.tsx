
import {Link} from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
    return (
        <div className="NavBar">
            <Link className="NavBlock" to="/">Главная </Link>
            <Link className="NavBlock" to="/game">Игры </Link>
            <Link className="NavBlock" to="/competition">Соревнование </Link>
            <Link className="NavBlock" to="/account">аккаунт </Link>
        </div>
    )
}

export default NavBar
