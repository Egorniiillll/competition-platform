import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getALlUser } from "../api/userApi.ts";
import type { User } from "../types/User.ts";

function Registration() {
    const [users, setUsers] = useState<User[]>([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getALlUser()
            .then((data) => {
                setUsers(data)
                setLoading(false)
            })
            .catch(() => {
                setError("Ошибка загрузки пользователей")
                setLoading(false)
            })
    }, [])

    function chooseUser(userId: number) {
        localStorage.setItem("currentUserId", String(userId))
        navigate("/game")
    }

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            <h1>Выберите пользователя</h1>

            {users.map((user) => (
                <div key={user.id}>
                    <p>{user.username}</p>
                    <p>{user.role}</p>
                    <button onClick={() => chooseUser(user.id)}>
                        Выбрать
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Registration;