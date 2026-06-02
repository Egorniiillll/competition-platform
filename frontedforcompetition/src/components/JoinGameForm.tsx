import { useEffect, useState } from "react";
import { createGameApplication } from "../api/gameApplicationApi.ts";
import { getUser } from "../api/userApi.ts";
import type { User } from "../types/User.ts";
import "../styles/JoinGameForm.css";

type JoinGameFormProps = {
    gameId: number
    onSuccess: () => void
}

function JoinGameForm({ gameId, onSuccess }: JoinGameFormProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loadingUser, setLoadingUser] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const currentUserId = localStorage.getItem("currentUserId")

        if (!currentUserId) {
            setError("Сначала выберите пользователя")
            setLoadingUser(false)
            return
        }

        getUser(Number(currentUserId))
            .then((data) => {
                setUser(data)
                setLoadingUser(false)
            })
            .catch(() => {
                setError("Не удалось загрузить данные пользователя")
                setLoadingUser(false)
            })
    }, [])

    async function handleSendApplication() {
        try {
            setError("")

            const currentUserId = localStorage.getItem("currentUserId")

            if (!currentUserId) {
                setError("Сначала выберите пользователя")
                return
            }

            await createGameApplication(Number(currentUserId), gameId)
            onSuccess()
        } catch {
            setError("Ошибка отправки заявки")
        }
    }

    if (loadingUser) {
        return <p className="JoinGameLoading">Загрузка данных участника...</p>
    }

    return (
        <div className="JoinGameForm">
            <h2>Форма участия</h2>

            <div className="JoinGameGrid">
                <div className="JoinGameField JoinGameFieldWide">
                    <label>ФИО</label>
                    <input
                        value={`${user?.secondName ?? ""} ${user?.firstName ?? ""} ${user?.thirdName ?? ""}`.trim()}
                        readOnly
                    />
                </div>

                <div className="JoinGameField">
                    <label>Email</label>
                    <input value={user?.email ?? ""} readOnly />
                </div>

                <div className="JoinGameField">
                    <label>Дата рождения</label>
                    <input value={user?.birthdayDate ?? ""} readOnly />
                </div>

                <div className="JoinGameField">
                    <label>Телефон</label>
                    <input value={user?.personalPhone ?? ""} readOnly />
                </div>

                <div className="JoinGameField">
                    <label>Вес</label>
                    <input
                        value={user?.weight ? String(user.weight) : ""}
                        readOnly
                    />
                </div>

                <div className="JoinGameField">
                    <label>Рост</label>
                    <input
                        value={user?.height ? String(user.height) : ""}
                        readOnly
                    />
                </div>
            </div>

            <button className="JoinGameButton" onClick={handleSendApplication}>
                Отправить заявку
            </button>

            {error && <p className="JoinGameError">{error}</p>}
        </div>
    )
}

export default JoinGameForm;