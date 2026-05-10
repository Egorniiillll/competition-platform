import { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/userApi";
import type { User } from "../types/User";
import "../styles/AccountPage.css";

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

        if (!currentUserId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setError("Пользователь не выбран")
            setLoading(false)
            return
        }

        getUser(Number(currentUserId))
            .then((data) => {
                setUser(data)
                setUsername(data.username || "")
                setFirstName(data.firstName || "")
                setSecondName(data.secondName || "")
                setThirdName(data.thirdName || "")
                setEmail(data.email || "")
                setBirthdayDate(data.birthdayDate || "")
                setPersonalPhone(data.personalPhone || "")
                setGender(data.gender || "")
                setCity(data.city || "")
                setHeight(String(data.height ?? ""))
                setWeight(String(data.weight ?? ""))
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
            setMessage("Данные обновлены")
        } catch {
            setError("Ошибка обновления")
        }
    }

    if (loading) {
        return <h1 className="AccountPageLoading">Загрузка...</h1>
    }

    if (error && !user) {
        return <h1 className="AccountPageError">{error}</h1>
    }

    return (
        <div className="AccountPage">
            <div className="AccountCard">
                <div className="AccountHeader">
                    <div>
                        <h1 className="AccountTitle">Аккаунт</h1>
                        <p className="AccountSubtitle">Редактирование личных данных</p>
                    </div>

                    <div className="AccountRoleBlock">
                        <span className="AccountRoleLabel">Роль</span>
                        <span className="AccountRoleValue">{user?.role}</span>
                    </div>
                </div>

                <div className="AccountSection">
                    <h2 className="AccountSectionTitle">Основная информация</h2>

                    <div className="AccountGrid">
                        <div className="AccountField">
                            <label>Логин</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="AccountField">
                            <label>Имя</label>
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="AccountField">
                            <label>Фамилия</label>
                            <input
                                value={secondName}
                                onChange={(e) => setSecondName(e.target.value)}
                            />
                        </div>

                        <div className="AccountField">
                            <label>Отчество</label>
                            <input
                                value={thirdName}
                                onChange={(e) => setThirdName(e.target.value)}
                            />
                        </div>

                        <div className="AccountField">
                            <label>Почта</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="AccountField">
                            <label>Телефон</label>
                            <input
                                value={personalPhone}
                                onChange={(e) => setPersonalPhone(e.target.value)}
                            />
                        </div>

                        <div className="AccountField">
                            <label>Дата рождения</label>
                            <input
                                type="date"
                                value={birthdayDate}
                                onChange={(e) => setBirthdayDate(e.target.value)}
                            />
                        </div>

                        <div className="AccountField">
                            <label>Пол</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                            </select>
                        </div>

                        <div className="AccountField">
                            <label>Город</label>
                            <input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div className="AccountField">
                            <label>Рост</label>
                            <input
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>

                        <div className="AccountField">
                            <label>Вес</label>
                            <input
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </div>

                        <div className="AccountField AccountFieldReadonly">
                            <label>Дата регистрации</label>
                            <div className="AccountReadonlyValue">
                                {user?.dateOfRegistration}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="AccountActions">
                    <button className="AccountSaveButton" onClick={handleSave}>
                        Сохранить
                    </button>
                </div>

                {message && <div className="AccountMessageSuccess">{message}</div>}
                {error && <div className="AccountMessageError">{error}</div>}
            </div>
        </div>
    )
}

export default AccountPage;