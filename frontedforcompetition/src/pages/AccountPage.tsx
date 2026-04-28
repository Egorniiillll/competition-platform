import {useEffect, useState} from "react"
import {getUser} from "../api/userApi"
import type {User} from "../types/User"

function AccountPage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        getUser(1).then((data) => {
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
            <p>Логин: {user?.username}</p>
            <p>Имя: {user?.firstName}</p>
            <p>Фамилия: {user?.secondName}</p>
            <p>Отчество: {user?.thirdName}</p>
            <p>День Рождение: {user?.birthdayDate}</p>
            <p>dateOfRegistration: {user?.dateOfRegistration}</p>
            <p>Номер телефона: {user?.personalPhone}</p>
            <p>Почта: {user?.email}</p>
            <p>Пол: {user?.gender}</p>
            <p>Город: {user?.city}</p>
            <p>Рост: {user?.height}</p>
            <p>вес: {user?.weight}</p>

        </div>
    )
}

export default AccountPage