import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, loginUser } from "../api/userApi.ts";
import "../styles/Registration.css";

function Registration() {
    const [mode, setMode] = useState<"login" | "register">("login")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [thirdName, setThirdName] = useState("")
    const [birthdayDate, setBirthdayDate] = useState("")
    const [personalPhone, setPersonalPhone] = useState("")
    const [gender, setGender] = useState("MALE")
    const [city, setCity] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [role, setRole] = useState("PARTICIPANT")

    async function handleLogin() {
        try {
            setError("")
            setMessage("")

            const user = await loginUser(email.trim(), password)
            localStorage.setItem("currentUserId", String(user.id))
            navigate("/game")
        } catch {
            setError("Неверный логин, почта или пароль")
        }
    }

    async function handleRegister() {
        try {
            setError("")
            setMessage("")

            await createUser({
                username,
                firstName,
                secondName,
                thirdName,
                email,
                password,
                birthdayDate,
                personalPhone,
                gender,
                city,
                height,
                weight,
                role
            })

            setMessage("Регистрация прошла успешно")

            const user = await loginUser(email.trim(), password)
            localStorage.setItem("currentUserId", String(user.id))
            navigate("/game")
        } catch {
            setError("Ошибка регистрации")
        }
    }

    return (
        <div className="RegistrationPage">
            <div className="RegistrationShell">
                <div className="RegistrationCard">
                    <div className="RegistrationTabs">
                        <button
                            className={mode === "login" ? "RegistrationTab ActiveRegistrationTab" : "RegistrationTab"}
                            onClick={() => {
                                setMode("login")
                                setError("")
                                setMessage("")
                            }}
                        >
                            Вход
                        </button>
                        <button
                            className={mode === "register" ? "RegistrationTab ActiveRegistrationTab" : "RegistrationTab"}
                            onClick={() => {
                                setMode("register")
                                setError("")
                                setMessage("")
                            }}
                        >
                            Регистрация
                        </button>
                    </div>

                    {mode === "login" && (
                        <div className="RegistrationForm">
                            <div className="RegistrationFormHeader">
                                <h2>Вход в аккаунт</h2>
                                <p>Введите логин или почту и пароль</p>
                            </div>
                            <div className="RegistrationField">
                                <label>Логин или почта</label>
                                <input
                                    placeholder="логин или example@mail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="RegistrationField">
                                <label>Пароль</label>
                                <input
                                    type="password"
                                    placeholder="Введите пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="RegistrationMainButton" onClick={handleLogin}>
                                Войти
                            </button>
                        </div>
                    )}
                    {mode === "register" && (
                        <div className="RegistrationForm">
                            <div className="RegistrationFormHeader">
                                <h2>Создание аккаунта</h2>
                                <p>Заполните данные пользователя</p>
                            </div>

                            <div className="RegistrationGrid">
                                <div className="RegistrationField">
                                    <label>Логин</label>
                                    <input
                                        placeholder="Введите логин"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="RegistrationField">
                                    <label>Имя</label>
                                    <input
                                        placeholder="Введите имя"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="RegistrationField">
                                    <label>Фамилия</label>
                                    <input
                                        placeholder="Введите фамилию"
                                        value={secondName}
                                        onChange={(e) => setSecondName(e.target.value)}
                                    />
                                </div>

                                <div className="RegistrationField">
                                    <label>Отчество</label>
                                    <input
                                        placeholder="Введите отчество"
                                        value={thirdName}
                                        onChange={(e) => setThirdName(e.target.value)}
                                    />
                                </div>

                                <div className="RegistrationField">
                                    <label>Почта</label>
                                    <input
                                        placeholder="example@mail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="RegistrationField">
                                    <label>Пароль</label>
                                    <input
                                        type="password"
                                        placeholder="Введите пароль"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="RegistrationField">
                                    <label>Дата рождения</label>
                                    <input
                                        type="date"
                                        value={birthdayDate}
                                        onChange={(e) => setBirthdayDate(e.target.value)}
                                    />
                                </div>

                                <div className="RegistrationField">
                                    <label>Телефон</label>
                                    <input
                                        placeholder="+79991234567"
                                        value={personalPhone}
                                        onChange={(e) => setPersonalPhone(e.target.value)}
                                    />
                                </div>

                                <div className="RegistrationField">
                                    <label>Пол</label>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                    </select>
                                </div>
                                <div className="RegistrationField">
                                    <label>Город</label>
                                    <input
                                        placeholder="Введите город"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div className="RegistrationField">
                                    <label>Рост</label>
                                    <input
                                        type="number"
                                        placeholder="Например: 182"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                    />
                                </div>
                                <div className="RegistrationField">
                                    <label>Вес</label>
                                    <input
                                        type="number"
                                        placeholder="Например: 74"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </div>

                                <div className="RegistrationField RegistrationFieldWide">
                                    <label>Роль</label>
                                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="PARTICIPANT">PARTICIPANT</option>
                                        <option value="ORGANIZER">ORGANIZER</option>
                                    </select>
                                </div>
                            </div>
                            <button className="RegistrationMainButton" onClick={handleRegister}>
                                Зарегистрироваться
                            </button>
                        </div>
                    )}
                    {message && <div className="RegistrationSuccess">{message}</div>}
                    {error && <div className="RegistrationError">{error}</div>}
                </div>
            </div>
        </div>
    )
}

export default Registration