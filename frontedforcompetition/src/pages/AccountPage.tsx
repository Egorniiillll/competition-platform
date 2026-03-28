import {useEffect, useState} from "react"
import {getUser} from "../api/userApi"
import type {User} from "../types/User"

function AccountPage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getUser(3).then((data) => {
            setUser(data)
            setLoading(false)
        })
            .catch(() => {
                setError("Ошибка загрузки пользователя")
                setLoading(false)
            })

    }, [])

    if (loading) {
        return <h1>Загрузка...</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            <h1>Мой аккаунт</h1>
            <p>id: {user?.id}</p>
            <p>username: {user?.username}</p>
            <p>email: {user?.email}</p>
            <p>createdAt: {user?.createdAt}</p>
        </div>
    )
}

export default AccountPage