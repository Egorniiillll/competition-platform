import { useState } from "react";
import {createCompetitionApplication} from "../api/competitionApplicationApi.ts";


type JoinCompetitionFormProps = {
    competitionId: number
    onSuccess: () => void
}

function JoinCompetitionForm({ competitionId, onSuccess }: JoinCompetitionFormProps) {
    const [teamName, setTeamName] = useState("")
    const [playersCount, setPlayersCount] = useState("")
    const [comment, setComment] = useState("")
    const [error, setError] = useState("")

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

    return (
        <div>
            <h2>Форма участия</h2>

            <input
                placeholder="Название команды"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            />

            <input
                placeholder="Количество игроков"
                value={playersCount}
                onChange={(e) => setPlayersCount(e.target.value)}
            />

            <input
                placeholder="Комментарий"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <button onClick={handleSendApplication}>
                Отправить заявку
            </button>

            {error && <p>{error}</p>}
        </div>
    )
}

export default JoinCompetitionForm;