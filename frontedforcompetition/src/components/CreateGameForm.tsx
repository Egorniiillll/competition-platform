import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGame } from "../api/gameApi.ts";
import "../styles/CreateGameForm.css";

function CreateGameForm() {
    const [name, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [requirement, setRequirement] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [types, setTypes] = useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    async function handleCreateGame() {
        try {
            setError("")

            const organizerId = localStorage.getItem("currentUserId")

            if (!organizerId) {
                setError("Сначала выберите пользователя")
                return
            }

            await createGame({
                name,
                description,
                requirement,
                types,
                createdAt,
                startDate,
                endDate,
                imageURL,
                city,
                address,
                price,
                organizerId: Number(organizerId)
            })

            navigate("/game")
        } catch {
            setError("Ошибка создания игры")
        }
    }

    return (
        <div className="CreateGamePage">
            <div className="CreateGameCard">
                <div className="CreateGameHeader">
                    <h1 className="CreateGameTitle">Создание игры</h1>
                    <p className="CreateGameSubtitle">
                        Заполните данные новой игры
                    </p>
                </div>

                <div className="CreateGameGrid">
                    <div className="CreateGameField">
                        <label>Название игры</label>
                        <input
                            value={name}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введите название"
                        />
                    </div>

                    <div className="CreateGameField">
                        <label>Тип игры</label>
                        <input
                            value={types}
                            onChange={(e) => setTypes(e.target.value)}
                            placeholder="Например: футбол, теннис"
                        />
                    </div>

                    <div className="CreateGameField CreateGameFieldWide">
                        <label>Описание</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Подробное описание игры"
                            rows={4}
                        />
                    </div>

                    <div className="CreateGameField CreateGameFieldWide">
                        <label>Требования</label>
                        <textarea
                            value={requirement}
                            onChange={(e) => setRequirement(e.target.value)}
                            placeholder="Условия участия и важные требования"
                            rows={3}
                        />
                    </div>

                    <div className="CreateGameField">
                        <label>Дата создания</label>
                        <input
                            type="datetime-local"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                        />
                    </div>

                    <div className="CreateGameField">
                        <label>Дата начала</label>
                        <input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="CreateGameField">
                        <label>Дата конца</label>
                        <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <div className="CreateGameField">
                        <label>Ссылка на картинку</label>
                        <input
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="CreateGameField">
                        <label>Город</label>
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Введите город"
                        />
                    </div>

                    <div className="CreateGameField">
                        <label>Адрес</label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Введите адрес"
                        />
                    </div>

                    <div className="CreateGameField">
                        <label>Цена</label>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Например: 1000"
                        />
                    </div>
                </div>

                <div className="CreateGameActions">
                    <button
                        className="CreateGameButton"
                        onClick={handleCreateGame}
                    >
                        Создать игру
                    </button>
                </div>

                {error && <div className="CreateGameError">{error}</div>}
            </div>
        </div>
    )
}

export default CreateGameForm;