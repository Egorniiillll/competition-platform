import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Game} from "../types/Game.ts";
import {getOneGame} from "../api/gameApi.ts";
import "../styles/GameDetailsPage.css";


function GameDetailsPage() {
    const {id} = useParams();

    const [game, setGame] = useState<Game | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
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
                setError("Ошибка загрузки игр")
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (error) {
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
                    <button onClick={() => setShowForm(true)}>Участвовать</button>
                    {showForm && (
                        <div className="ParticipationForm">
                            <input placeholder="Имя"/>
                            <input placeholder="Телефон"/>
                            <input placeholder="Email"/>
                            {game?.types === "Футбол" && (
                                <div>
                                    <input placeholder="Название команды"/>
                                    <input placeholder="Количество игроков"/>
                                </div>
                            )}
                            {game?.types === "Шахматы" && (
                                <div>
                                    <input placeholder="Рейтинг"/>
                                    <input placeholder="Разряд"/>
                                </div>
                            )}
                        </div>)}
                </div>

            </div>

        </div>
    )
}

export default GameDetailsPage;