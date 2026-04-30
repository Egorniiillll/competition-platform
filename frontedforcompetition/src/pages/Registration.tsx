import {useEffect, useState} from "react";
import "../styles/GamePage.css";


import {getALlUser} from "../api/userApi.ts";
import type {User} from "../types/User.ts";
import {useNavigate} from "react-router-dom";



function GamePage() {
    const [users, setUsers] = useState<User[]>([])
    const navigate = useNavigate();


    useEffect(() => {
        getALlUser()
            .then((data) => {
                setUsers(data)
            })

    }, [])

    function chooseUser(userId: number) {

        localStorage.setItem("currentUserId", String(userId))

        navigate("/game")

    }

    return (
        <div className="GamePage">
            <h1 className="GamePageTitle">Игры</h1>


            {users.map((user) => (
                <div key={user.id}>
                    <p>{user.username}</p>
                    <p>{user.role}</p>
                    <button onClick={() => chooseUser(user.id)}>Выбрать</button>
                </div>
            ))}
        </div>
    )
}

export default GamePage;