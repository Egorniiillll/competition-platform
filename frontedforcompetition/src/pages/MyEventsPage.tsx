import { useEffect, useState } from "react";
import { getUser } from "../api/userApi.ts";
import {
    getGameApplicationsByUser,
    getGameApplicationsByOrganizer
} from "../api/gameApplicationApi.ts";
import {
    getCompetitionApplicationsByUser,
    getCompetitionApplicationsByOrganizer
} from "../api/competitionApplicationApi.ts";
import type { User } from "../types/User.ts";
import type { GameApplication } from "../types/GameApplication.ts";
import type { CompetitionApplication } from "../types/CompetitionApplication.ts";
import type { Game } from "../types/Game.ts";
import type { Competition } from "../types/Competition.ts";
import { getGamesByOrganizer } from "../api/gameApi.ts";
import { getCompetitionsByOrganizer } from "../api/competitionApi.ts";

function MyEventsPage() {
    const [user, setUser] = useState<User | null>(null)
    const [gameApplications, setGameApplications] = useState<GameApplication[]>([])
    const [competitionApplications, setCompetitionApplications] = useState<CompetitionApplication[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [organizerGames, setOrganizerGames] = useState<Game[]>([])
    const [organizerGameApplications, setOrganizerGameApplications] = useState<GameApplication[]>([])
    const [organizerCompetitions, setOrganizerCompetitions] = useState<Competition[]>([])
    const [organizerCompetitionApplications, setOrganizerCompetitionApplications] = useState<CompetitionApplication[]>([])

    const currentUserId = localStorage.getItem("currentUserId")

    useEffect(() => {
        if (!currentUserId) {
            return
        }

        getUser(Number(currentUserId))
            .then((userData) => {
                setUser(userData)

                if (userData.role === "PARTICIPANT") {
                    return Promise.all([
                        getGameApplicationsByUser(Number(currentUserId)),
                        getCompetitionApplicationsByUser(Number(currentUserId))
                    ]).then(([gamesData, competitionsData]) => {
                        setGameApplications(gamesData)
                        setCompetitionApplications(competitionsData)
                    })
                }

                if (userData.role === "ORGANIZER") {
                    return Promise.all([
                        getGamesByOrganizer(Number(currentUserId)),
                        getGameApplicationsByOrganizer(Number(currentUserId)),
                        getCompetitionsByOrganizer(Number(currentUserId)),
                        getCompetitionApplicationsByOrganizer(Number(currentUserId))
                    ]).then(([gamesData, gameApplicationsData, competitionsData, competitionApplicationsData]) => {
                        setOrganizerGames(gamesData)
                        setOrganizerGameApplications(gameApplicationsData)
                        setOrganizerCompetitions(competitionsData)
                        setOrganizerCompetitionApplications(competitionApplicationsData)
                    })
                }
            })
            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                setError("Ошибка загрузки страницы")
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
            <h1>Мои события</h1>

            {user?.role === "PARTICIPANT" && (
                <div>
                    <h2>Мои заявки на игры</h2>
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

                    <h2>Мои заявки на соревнования</h2>
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
            )}

            {user?.role === "ORGANIZER" && (
                <div>
                    <h2>Мои игры</h2>
                    {organizerGames.length === 0 ? (
                        <p>Вы еще не создали ни одной игры</p>
                    ) : (
                        organizerGames.map((game) => (
                            <div key={game.id}>
                                <h3>{game.name}</h3>
                                <p>Город: {game.city}</p>
                                <p>Адрес: {game.address}</p>
                                <p>Тип: {game.types}</p>
                                <p>Начало: {game.startDate}</p>
                            </div>
                        ))
                    )}

                    <h2>Заявки на мои игры</h2>
                    {organizerGameApplications.length === 0 ? (
                        <p>Заявок на мои игры пока нет</p>
                    ) : (
                        organizerGameApplications.map((application) => (
                            <div key={application.id}>
                                <h3>{application.game.name}</h3>
                                <p>Пользователь: {application.user.username}</p>
                                <p>Статус: {application.status}</p>
                                <p>Дата заявки: {application.createdAt}</p>

                                <button>Подтвердить</button>
                                <button>Отклонить</button>
                            </div>
                        ))
                    )}

                    <h2>Мои соревнования</h2>
                    {organizerCompetitions.length === 0 ? (
                        <p>Вы еще не создали ни одного соревнования</p>
                    ) : (
                        organizerCompetitions.map((competition) => (
                            <div key={competition.id}>
                                <h3>{competition.title}</h3>
                                <p>Город: {competition.city}</p>
                                <p>Адрес: {competition.address}</p>
                                <p>Формат: {competition.format}</p>
                                <p>Начало: {competition.startDate}</p>
                            </div>
                        ))
                    )}

                    <h2>Заявки на мои соревнования</h2>
                    {organizerCompetitionApplications.length === 0 ? (
                        <p>Заявок на мои соревнования пока нет</p>
                    ) : (
                        organizerCompetitionApplications.map((application) => (
                            <div key={application.id}>
                                <h3>{application.competition.title}</h3>
                                <p>Пользователь: {application.user.username}</p>
                                <p>Статус: {application.status}</p>
                                <p>Дата заявки: {application.createdAt}</p>

                                <button>Подтвердить</button>
                                <button>Отклонить</button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default MyEventsPage;