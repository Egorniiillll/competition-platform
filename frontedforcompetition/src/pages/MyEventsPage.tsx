import { useEffect, useState } from "react";
import { getUser } from "../api/userApi.ts";
import {
    getGameApplicationsByUser,
    getGameApplicationsByOrganizer,
    updateGameApplicationStatus,
    markGameApplicationAsPaid,
    updateGamePaymentStatus
} from "../api/gameApplicationApi.ts";
import {
    getCompetitionApplicationsByUser,
    getCompetitionApplicationsByOrganizer,
    updateCompetitionApplicationStatus,
    markCompetitionApplicationAsPaid,
    updateCompetitionPaymentStatus
} from "../api/competitionApplicationApi.ts";
import type { User } from "../types/User.ts";
import type { GameApplication } from "../types/GameApplication.ts";
import type { CompetitionApplication } from "../types/CompetitionApplication.ts";
import type { Game } from "../types/Game.ts";
import type { Competition } from "../types/Competition.ts";
import { getGamesByOrganizer } from "../api/gameApi.ts";
import { getCompetitionsByOrganizer } from "../api/competitionApi.ts";
import "../styles/MyEventsPage.css";

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
    const [gamePaymentProofs, setGamePaymentProofs] = useState<Record<number, string>>({})
    const [competitionPaymentProofs, setCompetitionPaymentProofs] = useState<Record<number, string>>({})

    const currentUserId = localStorage.getItem("currentUserId")

    useEffect(() => {
        if (!currentUserId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false)
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

    async function handleMarkGameAsPaid(applicationId: number) {
        try {
            const paymentProof = gamePaymentProofs[applicationId]?.trim()

            if (!paymentProof) {
                setError("Введите ссылку на подтверждение оплаты")
                return
            }

            await markGameApplicationAsPaid(applicationId, paymentProof)

            if (!currentUserId) {
                return
            }

            const updatedApplications = await getGameApplicationsByUser(Number(currentUserId))
            setGameApplications(updatedApplications)
            setError("")
        } catch {
            setError("Ошибка подтверждения оплаты игры")
        }
    }

    async function handleMarkCompetitionAsPaid(applicationId: number) {
        try {
            const paymentProof = competitionPaymentProofs[applicationId]?.trim()

            if (!paymentProof) {
                setError("Введите ссылку на подтверждение оплаты")
                return
            }

            await markCompetitionApplicationAsPaid(applicationId, paymentProof)

            if (!currentUserId) {
                return
            }

            const updatedApplications = await getCompetitionApplicationsByUser(Number(currentUserId))
            setCompetitionApplications(updatedApplications)
            setError("")
        } catch {
            setError("Ошибка подтверждения оплаты соревнования")
        }
    }

    async function handleUpdateGameApplicationStatus(applicationId: number, status: string) {
        try {
            await updateGameApplicationStatus(applicationId, status)

            if (!currentUserId) {
                return
            }

            const updatedApplications = await getGameApplicationsByOrganizer(Number(currentUserId))
            setOrganizerGameApplications(updatedApplications)
        } catch {
            setError("Ошибка обновления статуса заявки на игру")
        }
    }

    async function handleUpdateCompetitionApplicationStatus(applicationId: number, status: string) {
        try {
            await updateCompetitionApplicationStatus(applicationId, status)

            if (!currentUserId) {
                return
            }

            const updatedApplications = await getCompetitionApplicationsByOrganizer(Number(currentUserId))
            setOrganizerCompetitionApplications(updatedApplications)
        } catch {
            setError("Ошибка обновления статуса заявки на соревнование")
        }
    }

    async function handleUpdateGamePaymentStatus(applicationId: number, paymentStatus: string) {
        try {
            await updateGamePaymentStatus(applicationId, paymentStatus)

            if (!currentUserId) {
                return
            }

            const updatedApplications = await getGameApplicationsByOrganizer(Number(currentUserId))
            setOrganizerGameApplications(updatedApplications)
        } catch {
            setError("Ошибка обновления оплаты игры")
        }
    }

    async function handleUpdateCompetitionPaymentStatus(applicationId: number, paymentStatus: string) {
        try {
            await updateCompetitionPaymentStatus(applicationId, paymentStatus)

            if (!currentUserId) {
                return
            }

            const updatedApplications = await getCompetitionApplicationsByOrganizer(Number(currentUserId))
            setOrganizerCompetitionApplications(updatedApplications)
        } catch {
            setError("Ошибка обновления оплаты соревнования")
        }
    }

    if (!currentUserId) {
        return <h1 className="MyEventsPageLoading">Пользователь не выбран</h1>
    }

    if (loading) {
        return <h1 className="MyEventsPageLoading">Загрузка...</h1>
    }

    return (
        <div className="MyEventsPage">
            <div className="MyEventsCard">
                <div className="MyEventsHeader">
                    <div>
                        <h1 className="MyEventsTitle">Мои события</h1>
                        <p className="MyEventsSubtitle">Заявки, мои события и статусы оплаты</p>
                    </div>

                    <div className="MyEventsRoleBlock">
                        <span className="MyEventsRoleLabel">Роль</span>
                        <span className="MyEventsRoleValue">{user?.role}</span>
                    </div>
                </div>

                {error && <div className="MyEventsMessageError">{error}</div>}

                {user?.role === "PARTICIPANT" && (
                    <>
                        <section className="MyEventsSection">
                            <h2 className="MyEventsSectionTitle">Мои заявки на игры</h2>

                            {gameApplications.length === 0 ? (
                                <div className="MyEventsEmpty">Заявок на игры пока нет</div>
                            ) : (
                                <div className="MyEventsGrid">
                                    {gameApplications.map((application) => (
                                        <div key={application.id} className="MyEventItemCard">
                                            <h3 className="MyEventItemTitle">{application.game.name}</h3>

                                            <div className="MyEventInfoList">
                                                <p><span>Город:</span> {application.game.city}</p>
                                                <p><span>Адрес:</span> {application.game.address}</p>
                                                <p><span>Статус заявки:</span> {application.status}</p>
                                                <p><span>Статус оплаты:</span> {application.paymentStatus || "не указан"}</p>
                                                <p><span>Ссылка на оплату:</span> {application.paymentProof || "не указана"}</p>
                                                <p><span>Дата заявки:</span> {application.createdAt}</p>
                                            </div>

                                            {application.status === "APPROVED" && application.paymentStatus === "WAITING_FOR_PAYMENT" && (
                                                <div className="MyEventPayBlock">
                                                    <p className="MyEventHint">
                                                        Инструкция по оплате: переведите взнос по номеру +7 999 123-45-67
                                                    </p>

                                                    <input
                                                        className="MyEventInput"
                                                        placeholder="Вставьте ссылку на подтверждение оплаты"
                                                        value={gamePaymentProofs[application.id] || ""}
                                                        onChange={(e) =>
                                                            setGamePaymentProofs((prev) => ({
                                                                ...prev,
                                                                [application.id]: e.target.value
                                                            }))
                                                        }
                                                    />

                                                    <button
                                                        className="MyEventButton"
                                                        onClick={() => handleMarkGameAsPaid(application.id)}
                                                    >
                                                        Я оплатил
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="MyEventsSection">
                            <h2 className="MyEventsSectionTitle">Мои заявки на соревнования</h2>

                            {competitionApplications.length === 0 ? (
                                <div className="MyEventsEmpty">Заявок на соревнования пока нет</div>
                            ) : (
                                <div className="MyEventsGrid">
                                    {competitionApplications.map((application) => (
                                        <div key={application.id} className="MyEventItemCard">
                                            <h3 className="MyEventItemTitle">{application.competition.title}</h3>

                                            <div className="MyEventInfoList">
                                                <p><span>Город:</span> {application.competition.city}</p>
                                                <p><span>Адрес:</span> {application.competition.address}</p>
                                                <p><span>Статус заявки:</span> {application.status}</p>
                                                <p><span>Статус оплаты:</span> {application.paymentStatus || "не указан"}</p>
                                                <p><span>Ссылка на оплату:</span> {application.paymentProof || "не указана"}</p>
                                                <p><span>Дата заявки:</span> {application.createdAt}</p>
                                            </div>

                                            {application.status === "APPROVED" && application.paymentStatus === "WAITING_FOR_PAYMENT" && (
                                                <div className="MyEventPayBlock">
                                                    <p className="MyEventHint">
                                                        Инструкция по оплате: переведите взнос по номеру +7 999 123-45-67
                                                    </p>

                                                    <input
                                                        className="MyEventInput"
                                                        placeholder="Вставьте ссылку на подтверждение оплаты"
                                                        value={competitionPaymentProofs[application.id] || ""}
                                                        onChange={(e) =>
                                                            setCompetitionPaymentProofs((prev) => ({
                                                                ...prev,
                                                                [application.id]: e.target.value
                                                            }))
                                                        }
                                                    />

                                                    <button
                                                        className="MyEventButton"
                                                        onClick={() => handleMarkCompetitionAsPaid(application.id)}
                                                    >
                                                        Я оплатил
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}

                {user?.role === "ORGANIZER" && (
                    <>
                        <section className="MyEventsSection">
                            <h2 className="MyEventsSectionTitle">Мои игры</h2>

                            {organizerGames.length === 0 ? (
                                <div className="MyEventsEmpty">Вы еще не создали ни одной игры</div>
                            ) : (
                                <div className="MyEventsGrid">
                                    {organizerGames.map((game) => (
                                        <div key={game.id} className="MyEventItemCard">
                                            <h3 className="MyEventItemTitle">{game.name}</h3>

                                            <div className="MyEventInfoList">
                                                <p><span>Город:</span> {game.city}</p>
                                                <p><span>Адрес:</span> {game.address}</p>
                                                <p><span>Тип:</span> {game.types}</p>
                                                <p><span>Начало:</span> {game.startDate}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="MyEventsSection">
                            <h2 className="MyEventsSectionTitle">Заявки на мои игры</h2>

                            {organizerGameApplications.length === 0 ? (
                                <div className="MyEventsEmpty">Заявок на мои игры пока нет</div>
                            ) : (
                                <div className="MyEventsGrid">
                                    {organizerGameApplications.map((application) => (
                                        <div key={application.id} className="MyEventItemCard">
                                            <h3 className="MyEventItemTitle">{application.game.name}</h3>

                                            <div className="MyEventInfoList">
                                                <p><span>Пользователь:</span> {application.user.username}</p>
                                                <p><span>Статус заявки:</span> {application.status}</p>
                                                <p><span>Статус оплаты:</span> {application.paymentStatus || "не указан"}</p>
                                                <p><span>Ссылка на оплату:</span> {application.paymentProof || "не указана"}</p>
                                                <p><span>Дата заявки:</span> {application.createdAt}</p>
                                            </div>

                                            <div className="MyEventButtonsRow">
                                                <button
                                                    className="MyEventButton"
                                                    onClick={() => handleUpdateGameApplicationStatus(application.id, "APPROVED")}
                                                >
                                                    Подтвердить заявку
                                                </button>

                                                <button
                                                    className="MyEventButton DangerButton"
                                                    onClick={() => handleUpdateGameApplicationStatus(application.id, "REJECTED")}
                                                >
                                                    Отклонить заявку
                                                </button>
                                            </div>

                                            {application.paymentStatus === "CHECKING" && (
                                                <div className="MyEventButtonsRow">
                                                    <button
                                                        className="MyEventButton"
                                                        onClick={() => handleUpdateGamePaymentStatus(application.id, "PAID")}
                                                    >
                                                        Подтвердить оплату
                                                    </button>

                                                    <button
                                                        className="MyEventButton DangerButton"
                                                        onClick={() => handleUpdateGamePaymentStatus(application.id, "REJECTED")}
                                                    >
                                                        Отклонить оплату
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="MyEventsSection">
                            <h2 className="MyEventsSectionTitle">Мои соревнования</h2>

                            {organizerCompetitions.length === 0 ? (
                                <div className="MyEventsEmpty">Вы еще не создали ни одного соревнования</div>
                            ) : (
                                <div className="MyEventsGrid">
                                    {organizerCompetitions.map((competition) => (
                                        <div key={competition.id} className="MyEventItemCard">
                                            <h3 className="MyEventItemTitle">{competition.title}</h3>

                                            <div className="MyEventInfoList">
                                                <p><span>Город:</span> {competition.city}</p>
                                                <p><span>Адрес:</span> {competition.address}</p>
                                                <p><span>Формат:</span> {competition.format}</p>
                                                <p><span>Начало:</span> {competition.startDate}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="MyEventsSection">
                            <h2 className="MyEventsSectionTitle">Заявки на мои соревнования</h2>

                            {organizerCompetitionApplications.length === 0 ? (
                                <div className="MyEventsEmpty">Заявок на мои соревнования пока нет</div>
                            ) : (
                                <div className="MyEventsGrid">
                                    {organizerCompetitionApplications.map((application) => (
                                        <div key={application.id} className="MyEventItemCard">
                                            <h3 className="MyEventItemTitle">{application.competition.title}</h3>

                                            <div className="MyEventInfoList">
                                                <p><span>Пользователь:</span> {application.user.username}</p>
                                                <p><span>Статус заявки:</span> {application.status}</p>
                                                <p><span>Статус оплаты:</span> {application.paymentStatus || "не указан"}</p>
                                                <p><span>Ссылка на оплату:</span> {application.paymentProof || "не указана"}</p>
                                                <p><span>Дата заявки:</span> {application.createdAt}</p>
                                            </div>

                                            <div className="MyEventButtonsRow">
                                                <button
                                                    className="MyEventButton"
                                                    onClick={() => handleUpdateCompetitionApplicationStatus(application.id, "APPROVED")}
                                                >
                                                    Подтвердить заявку
                                                </button>

                                                <button
                                                    className="MyEventButton DangerButton"
                                                    onClick={() => handleUpdateCompetitionApplicationStatus(application.id, "REJECTED")}
                                                >
                                                    Отклонить заявку
                                                </button>
                                            </div>

                                            {application.paymentStatus === "CHECKING" && (
                                                <div className="MyEventButtonsRow">
                                                    <button
                                                        className="MyEventButton"
                                                        onClick={() => handleUpdateCompetitionPaymentStatus(application.id, "PAID")}
                                                    >
                                                        Подтвердить оплату
                                                    </button>

                                                    <button
                                                        className="MyEventButton DangerButton"
                                                        onClick={() => handleUpdateCompetitionPaymentStatus(application.id, "REJECTED")}
                                                    >
                                                        Отклонить оплату
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    )
}

export default MyEventsPage