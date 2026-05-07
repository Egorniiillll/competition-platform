import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Game } from "../types/Game.ts";
import { getOneGame } from "../api/gameApi.ts";
import JoinGameForm from "../components/JoinGameForm.tsx";

import "../styles/GameDetailsPage.css";

function GameDetailsPage() {
    const { id } = useParams();

    const [game, setGame] = useState<Game | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        if (!id) {
            return
        }

        getOneGame(Number(id))
            .then((data) => {
                setGame(data)
                setLoading(false)
            })
            .catch(() => {
                setError("Ошибка загрузки игры")
                setLoading(false)
            })
    }, [id])


    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (error && !game) {
        return <h1>{error}</h1>
    }


    return (

        <div className="GameDetailsPage">


            <div className="GameDetailsCard">
                <div className="GameDetailsImageBlock">
                    {game?.imageURL && (
                        <img
                            src={game.imageURL}
                            alt={game.name}
                            className="GameDetailsImage"
                        />
                    )}
                </div>

                <div className="GameDetailsContent">
                    <h1>{game?.name}</h1>
                    <p><strong>Описание:</strong> {game?.description}</p>
                    <p><strong>Условия:</strong> {game?.requirement}</p>
                    <p><strong>Тип:</strong> {game?.types}</p>
                    <p><strong>Создано:</strong> {game?.createdAt}</p>
                    <p><strong>Начало:</strong> {game?.startDate}</p>
                    <p><strong>Город:</strong> {game?.city}</p>
                    <p><strong>Адрес:</strong> {game?.address}</p>
                    <p><strong>Цена:</strong> {game?.price}</p>

                    <button onClick={() => setShowForm(true)}>
                        Участвовать
                    </button>
                    {showForm && game?.id && (
                        <JoinGameForm
                            gameId={game.id}
                            onSuccess={() => {
                                setShowForm(false)
                                setMessage("Заявка успешно отправлена")
                            }}
                        />
                    )}

                    {message && <p>{message}</p>}
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default GameDetailsPage;