import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/NavBar.css";
import type { User } from "../types/User.ts";
import { getUser } from "../api/userApi.ts";

function navLinkClass({ isActive }: { isActive: boolean }) {
    return isActive ? "NavBlock NavBlockActive" : "NavBlock"
}

function NavBar() {
    const location = useLocation()
    const [showNewEventMenu, setShowNewEventMenu] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    const isNewEventActive =
        location.pathname === "/new-event/game" ||
        location.pathname === "/new-event/competition"

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

            <NavLink to="/game" className={navLinkClass}>
                Игры
            </NavLink>
            <NavLink to="/competition" className={navLinkClass}>
                Соревнования
            </NavLink>
            <NavLink to="/my-chats" className={navLinkClass}>
                Чат
            </NavLink>

            {user && (
                <NavLink to="/my-events" className={navLinkClass}>
                    Мои события
                </NavLink>
            )}
            <NavLink to="/account" className={navLinkClass}>
                Аккаунт
            </NavLink>
            <NavLink to="/" end className={navLinkClass}>
                Выход
            </NavLink>

            {user?.role === "ORGANIZER" && (
                <div
                    className="NavDropdown"
                    onMouseEnter={() => setShowNewEventMenu(true)}
                    onMouseLeave={() => setShowNewEventMenu(false)}
                >
                    <div className={isNewEventActive ? "NavBlock NavBlockActive" : "NavBlock"}>
                        Новое событие
                    </div>

                    {showNewEventMenu && (
                        <div className="NavDropdownMenu">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "NavDropdownItem NavDropdownItemActive" : "NavDropdownItem"
                                }
                                to="/new-event/game"
                            >
                                Создать игру
                            </NavLink>

                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "NavDropdownItem NavDropdownItemActive" : "NavDropdownItem"
                                }
                                to="/new-event/competition"
                            >
                                Создать соревнование
                            </NavLink>
                        </div>
                    )}
                </div>
            )}

            {user && (
                <div className="NavUserInfo">
                    {user.username}
                </div>
            )}
        </div>
    )
}

export default NavBar;