import { useEffect, useState } from "react";
import { createCompetitionApplication } from "../api/competitionApplicationApi.ts";
import { getUser } from "../api/userApi.ts";
import type { User } from "../types/User.ts";

type JoinCompetitionFormProps = {
    competitionId: number
    onSuccess: () => void
}

function JoinCompetitionForm({ competitionId, onSuccess }: JoinCompetitionFormProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loadingUser, setLoadingUser] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const currentUserId = localStorage.getItem("currentUserId")

        if (!currentUserId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
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

            await createCompetitionApplication(Number(currentUserId), competitionId)
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

export default JoinCompetitionForm;