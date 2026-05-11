import { useEffect, useState } from "react";
import { createGameApplication } from "../api/gameApplicationApi.ts";
import { getUser } from "../api/userApi.ts";
import type { User } from "../types/User.ts";

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
        return <p>Загрузка данных участника...</p>
    }

    return (
        <div>
            <h2>Форма участия</h2>

            <input
                value={`${user?.secondName ?? ""} ${user?.firstName ?? ""} ${user?.thirdName ?? ""}`.trim()}
                readOnly
                placeholder="ФИО"
            />

            <input
                value={user?.email ?? ""}
                readOnly
                placeholder="Email"
            />

            <input
                value={user?.birthdayDate ?? ""}
                readOnly
                placeholder="День рождения"
            />

            <input
                value={user?.personalPhone ?? ""}
                readOnly
                placeholder="Телефон"
            />

            <input
                value={user?.weight ? String(user.weight) : ""}
                readOnly
                placeholder="Вес"
            />

            <input
                value={user?.height ? String(user.height) : ""}
                readOnly
                placeholder="Рост"
            />

            <button onClick={handleSendApplication}>
                Отправить заявку
            </button>

            {error && <p>{error}</p>}
        </div>
    )
}

export default JoinGameForm;