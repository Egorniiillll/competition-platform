import { useEffect, useState } from "react";
import { getGameApplicationsByUser } from "../api/gameApplicationApi.ts";
import { getCompetitionApplicationsByUser } from "../api/competitionApplicationApi.ts";
import type { GameApplication } from "../types/GameApplication.ts";
import type { CompetitionApplication } from "../types/CompetitionApplication.ts";

function MyApplicationsPage() {
    const [gameApplications, setGameApplications] = useState<GameApplication[]>([])
    const [competitionApplications, setCompetitionApplications] = useState<CompetitionApplication[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const currentUserId = localStorage.getItem("currentUserId")

    useEffect(() => {
        if (!currentUserId) {
            return
        }

        Promise.all([
            getGameApplicationsByUser(Number(currentUserId)),
            getCompetitionApplicationsByUser(Number(currentUserId))
        ])
            .then(([gamesData, competitionsData]) => {
                setGameApplications(gamesData)
                setCompetitionApplications(competitionsData)
                setLoading(false)
            })
            .catch(() => {
                setError("Ошибка загрузки заявок")
                setLoading(false)
            })
    }, [currentUserId])

    if (!currentUserId) {
        return <h1>Пользователь не выбран</h1>
    }

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            <h1>Мои заявки</h1>

            <h2>Игры</h2>
            {gameApplications.length === 0 ? (
                <p>Заявок на игры пока нет</p>
            ) : (
                gameApplications.map((application) => (
                    <div key={application.id}>
                        <h3>{application.game.name}</h3>
                        <p>Город: {application.game.city}</p>
                        <p>Адрес: {application.game.address}</p>
                        <p>Статус: {application.status}</p>
                        <p>Дата заявки: {application.createdAt}</p>
                    </div>
                ))
            )}

            <h2>Соревнования</h2>
            {competitionApplications.length === 0 ? (
                <p>Заявок на соревнования пока нет</p>
            ) : (
                competitionApplications.map((application) => (
                    <div key={application.id}>
                        <h3>{application.competition.title}</h3>
                        <p>Город: {application.competition.city}</p>
                        <p>Адрес: {application.competition.address}</p>
                        <p>Статус: {application.status}</p>
                        <p>Дата заявки: {application.createdAt}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default MyApplicationsPage;