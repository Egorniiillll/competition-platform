import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import type { Game } from "../types/Game.ts";
import type { GameApplication } from "../types/GameApplication.ts";
import { getOneGame } from "../api/gameApi.ts";
import { getGameApplicationsByUser } from "../api/gameApplicationApi.ts";
import JoinGameForm from "../components/JoinGameForm.tsx";
import GameChat from "../components/GameChat.tsx";

import "../styles/GameDetailsPage.css";

function GameDetailsPage() {
    const { id } = useParams()

    const [game, setGame] = useState<Game | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [application, setApplication] = useState<GameApplication | null>(null)

    function formatDate(date: string | undefined) {
        if (!date) {
            return ""
        }

        return new Date(date).toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    const loadApplication = useCallback(async () => {
        const currentUserId = localStorage.getItem("currentUserId")
        if (!id || !currentUserId) {
            return
        }

        const applicationsData = await getGameApplicationsByUser(Number(currentUserId))
        const currentApplication = applicationsData.find(
            (item) => item.game.id === Number(id)
        )

        setApplication(currentApplication || null)
    }, [id])

    useEffect(() => {
        const currentUserId = localStorage.getItem("currentUserId")
        if (!id || !currentUserId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false)
            return
        }

        Promise.all([
            getOneGame(Number(id)),
            getGameApplicationsByUser(Number(currentUserId))
        ])
            .then(([gameData, applicationsData]) => {
                setGame(gameData)

                const currentApplication = applicationsData.find(
                    (item) => item.game.id === Number(id)
                )

                setApplication(currentApplication || null)
                setLoading(false)
            })
            .catch(() => {
                setError("Ошибка загрузки игры")
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return <h1 className="GameDetailsLoading">Загрузка...</h1>
    }

    if (error && !game) {
        return <h1 className="GameDetailsLoading">{error}</h1>
    }

    return (
        <div className="GameDetailsPage">
            <div className="GameDetailsContainer">
                <div className="GameDetailsHero">
                    <div className="GameDetailsImageBlock">
                        {game?.imageURL && (
                            <img
                                src={game.imageURL}
                                alt={game.name}
                                className="GameDetailsImage"
                            />
                        )}
                    </div>

                    <div className="GameDetailsMain">
                        <p className="GameDetailsType">{game?.types}</p>

                        <h1>{game?.name}</h1>

                        <p className="GameDetailsDescription">
                            {game?.description}
                        </p>

                        <div className="GameDetailsInfoGrid">
                            <div className="GameDetailsInfoItem">
                                <span>Город</span>
                                <p>{game?.city}</p>
                            </div>

                            <div className="GameDetailsInfoItem">
                                <span>Дата начала</span>
                                <p>{formatDate(game?.startDate)}</p>
                            </div>

                            <div className="GameDetailsInfoItem">
                                <span>Адрес</span>
                                <p>{game?.address}</p>
                            </div>

                            <div className="GameDetailsInfoItem">
                                <span>Цена</span>
                                <p>{game?.price} ₽</p>
                            </div>
                        </div>

                        <div className="GameDetailsRequirement">
                            <span>Условия участия</span>
                            <p>{game?.requirement}</p>
                        </div>

                        {!application && !showForm && (
                            <div className="GameDetailsActions">
                                <button onClick={() => setShowForm(true)}>
                                    Участвовать
                                </button>
                            </div>
                        )}

                        {!application && showForm && game?.id && (
                            <JoinGameForm
                                gameId={game.id}
                                onSuccess={async () => {
                                    setShowForm(false)
                                    setMessage("Заявка успешно отправлена")
                                    await loadApplication()
                                }}
                            />
                        )}

                        {application && (
                            <div className="GameApplicationBlock">
                                <p>
                                    <span>Статус заявки:</span> {application.status}
                                </p>

                                {application.status === "PENDING" && (
                                    <p>Заявка отправлена и ожидает подтверждения организатором.</p>
                                )}

                                {application.status === "REJECTED" && (
                                    <p>Заявка отклонена.</p>
                                )}
                            </div>
                        )}

                        {message && <p className="SuccessMessage">{message}</p>}
                        {error && <p className="ErrorMessage">{error}</p>}
                    </div>
                </div>

                {application?.status === "APPROVED" && game?.id && (
                    <div className="GameDetailsChatBlock">
                        <GameChat gameId={game.id} title={game.name} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default GameDetailsPage