import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCompetition } from "../api/competitionApi.ts";

function CreateCompetitionForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [placeName, setPlaceName] = useState("")
    const [entryFee, setEntryFee] = useState("")
    const [maxParticipants, setMaxParticipants] = useState("")
    const [currentParticipants, setCurrentParticipants] = useState("")
    const [requirements, setRequirements] = useState("")
    const [minAge, setMinAge] = useState("")
    const [maxAge, setMaxAge] = useState("")
    const [status, setStatus] = useState("")
    const [format, setFormat] = useState("")
    const [gameId, setGameId] = useState("")
    const [organizerId, setOrganizerId] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    async function handleCreateCompetition() {
        try {
            setError("")

            await createCompetition({
                title,
                description,
                shortDescription,
                createdAt,
                startDate,
                endDate,
                imageURL,
                city,
                address,
                placeName,
                entryFee,
                maxParticipants,
                currentParticipants,
                requirements,
                minAge,
                maxAge,
                status,
                format,
                gameId,
                organizerId
            })

            navigate("/competition")
        } catch {
            setError("Ошибка создания соревнования")
        }
    }

    return (
        <div className="CreateCompetitionForm">
            <h2>Форма создания соревнования</h2>

            <input
                placeholder="Название соревнования"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                placeholder="Короткое описание"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
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
                placeholder="Название места"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
            />

            <input
                placeholder="Взнос"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
            />

            <input
                placeholder="Максимум участников"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
            />

            <input
                placeholder="Текущее число участников"
                value={currentParticipants}
                onChange={(e) => setCurrentParticipants(e.target.value)}
            />

            <input
                placeholder="Требования"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
            />

            <input
                placeholder="Минимальный возраст"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
            />

            <input
                placeholder="Максимальный возраст"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
            />

            <input
                placeholder="Статус (OPEN, CLOSED...)"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />

            <input
                placeholder="Формат (SOLO, TEAM)"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
            />

            <input
                placeholder="ID игры"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
            />

            <input
                placeholder="ID организатора"
                value={organizerId}
                onChange={(e) => setOrganizerId(e.target.value)}
            />

            <button onClick={handleCreateCompetition}>
                Создать соревнование
            </button>

            {error && <p>{error}</p>}
        </div>
    )
}

export default CreateCompetitionForm;