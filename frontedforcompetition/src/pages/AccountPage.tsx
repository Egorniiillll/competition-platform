import { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/userApi";
import type { User } from "../types/User";

function AccountPage() {
    const [user, setUser] = useState<User | null>(null)
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [thirdName, setThirdName] = useState("")
    const [email, setEmail] = useState("")
    const [birthdayDate, setBirthdayDate] = useState("")
    const [personalPhone, setPersonalPhone] = useState("")
    const [gender, setGender] = useState("")
    const [city, setCity] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        const currentUserId = localStorage.getItem("currentUserId")



        getUser(Number(currentUserId))
            .then((data) => {
                setUser(data)
                setUsername(data.username)
                setFirstName(data.firstName)
                setSecondName(data.secondName)
                setThirdName(data.thirdName)
                setEmail(data.email)
                setBirthdayDate(data.birthdayDate)
                setPersonalPhone(data.personalPhone)
                setGender(data.gender)
                setCity(data.city)
                setHeight(String(data.height))
                setWeight(String(data.weight))
                setLoading(false)
            })
            .catch(() => {
                setError("Ошибка загрузки аккаунта")
                setLoading(false)
            })
    }, [])

    async function handleSave() {
        try {
            setError("")
            setMessage("")
            if (!user) {
                return
            }
            const updatedUser = await updateUser(user.id, {
                username,
                firstName,
                secondName,
                thirdName,
                email,
                birthdayDate,
                personalPhone,
                gender,
                city,
                height: Number(height),
                weight: Number(weight)
            })
            setUser(updatedUser)
            setMessage("данные обновлены")
        } catch {
            setError("ошибка обновлления ")
        }
    }

    if (loading) {
        return <h1>Загрузка...</h1>
    }
    if (error && !user) {
        return <h1>{error}</h1>
    }
    return (
        <div>
            <h1>Аккаунт</h1>
            <div>
                <label>Логин</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div>
                <label>Имя</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div>
                <label>Фамилия</label>
                <input value={secondName} onChange={(e) => setSecondName(e.target.value)} />
            </div>

            <div>
                <label>Отчество</label>
                <input value={thirdName} onChange={(e) => setThirdName(e.target.value)} />
            </div>

            <div>
                <label>Почта</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
                <label>Телефон</label>
                <input value={personalPhone} onChange={(e) => setPersonalPhone(e.target.value)} />
            </div>

            <div>
                <label>Дата рождения</label>
                <input
                    type="date"
                    value={birthdayDate}
                    onChange={(e) => setBirthdayDate(e.target.value)}
                />
            </div>

            <div>
                <label>Пол</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                </select>
            </div>
            <div>
                <label>Город</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
                <label>Рост</label>
                <input value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>

            <div>
                <label>Вес</label>
                <input value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div>
                <label>Дата регистрации</label>
                <p>{user?.dateOfRegistration}</p>
            </div>

            <div>
                <label>Роль</label>
                <p>{user?.role}</p>
            </div>
            <button onClick={handleSave}>Сохранить</button>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    )
}

export default AccountPage