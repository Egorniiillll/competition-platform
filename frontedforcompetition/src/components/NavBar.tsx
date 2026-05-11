import {Link, NavLink} from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/NavBar.css";
import type { User } from "../types/User.ts";
import { getUser } from "../api/userApi.ts";

function NavBar() {
    const [showNewEventMenu, setShowNewEventMenu] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const currentUserId = localStorage.getItem("currentUserId")

        if (!currentUserId) {
            return
        }

        getUser(Number(currentUserId))
            .then((data) => {
                setUser(data)
            })
            .catch(() => {
                setUser(null)
            })
    }, [])

    return (
        <div className="NavBar">
            <Link className="NavBlock" to="/">Главная</Link>
            <Link className="NavBlock" to="/game">Игры</Link>
            <Link className="NavBlock" to="/competition">Соревнования</Link>
            <Link className="NavBlock" to="/account">Аккаунт</Link>

            <NavLink
                to="/chat"
                className={({ isActive }) => isActive ? "NavItem ActiveNavItem" : "NavItem"}
            >
                Чат
            </NavLink>

            {user && (
                <Link className="NavBlock" to="/my-events">
                    Мои события
                </Link>
            )}

            {user?.role === "ORGANIZER" && (
                <div
                    className="NavDropdown"
                    onMouseEnter={() => setShowNewEventMenu(true)}
                    onMouseLeave={() => setShowNewEventMenu(false)}
                >
                    <div className="NavBlock">Новое событие</div>

                    {showNewEventMenu && (
                        <div className="NavDropdownMenu">
                            <Link className="NavDropdownItem" to="/new-event/game">
                                Создать игру
                            </Link>

                            <Link className="NavDropdownItem" to="/new-event/competition">
                                Создать соревнование
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {user && (
                <div className="NavUserInfo">
                    {user.username} ({user.role})
                </div>
            )}
        </div>
    )
}

export default NavBar;