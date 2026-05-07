import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createGame} from "../api/gameApi.ts";

function CreateGameForm() {
    const [name, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [requirement, setShortDescription] = useState("")
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
        <div className="CreateGameForm">
            <h2>Форма создания игры</h2>

            <input
                placeholder="Название Игры"
                value={name}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                placeholder="Короткое описание"
                value={requirement}
                onChange={(e) => setShortDescription(e.target.value)}
            />

            <input
                placeholder="Короткое описание"
                value={types}
                onChange={(e) => setTypes(e.target.value)}
            />

            <input
                placeholder="Дата создания"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
            />

            <input
                placeholder="Дата начала"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <input
                placeholder="Дата конца"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />

            <input
                placeholder="Ссылка на картинку"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
            />

            <input
                placeholder="Город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <input
                placeholder="Адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <input
                placeholder="цеана"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />



            <button onClick={handleCreateGame}>
                Создать соревнование
            </button>

            {error && <p>{error}</p>}
        </div>
    )
}

export default CreateGameForm;