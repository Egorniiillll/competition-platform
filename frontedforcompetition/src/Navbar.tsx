import {Link} from "react-router-dom";

function Navbar() {
    return (
        <header>
            <nav>
                <Link to="/">Главная</Link>
                <Link to="/competition">competition</Link>
                <Link to="/account">Мой аккаунт</Link>
            </nav>

        </header>

    )
}

export default Navbar;