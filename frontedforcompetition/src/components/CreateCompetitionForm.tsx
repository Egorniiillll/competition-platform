import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCompetition } from "../api/competitionApi.ts";
import "../styles/CreateCompetitionForm.css";

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
    const [status, setStatus] = useState("OPEN")
    const [format, setFormat] = useState("SOLO")
    const [gameId, setGameId] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    async function handleCreateCompetition() {
        try {
            setError("")

            const organizerId = localStorage.getItem("currentUserId")

            if (!organizerId) {
                setError("Сначала выберите пользователя")
                return
            }

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
                gameId: Number(gameId),
                organizerId: Number(organizerId)
            })

            navigate("/competition")
        } catch {
            setError("Ошибка создания соревнования")
        }
    }

    return (
        <div className="CreateCompetitionPage">
            <div className="CreateCompetitionCard">
                <div className="CreateCompetitionHeader">
                    <h1 className="CreateCompetitionTitle">Создание соревнования</h1>
                    <p className="CreateCompetitionSubtitle">
                        Заполните данные нового соревнования
                    </p>
                </div>

                <div className="CreateCompetitionGrid">
                    <div className="CreateCompetitionField">
                        <label>Название соревнования</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введите название"
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Короткое описание</label>
                        <input
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            placeholder="Кратко опишите соревнование"
                        />
                    </div>

                    <div className="CreateCompetitionField CreateCompetitionFieldWide">
                        <label>Описание</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Подробное описание соревнования"
                            rows={4}
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Дата создания</label>
                        <input
                            type="datetime-local"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Дата начала</label>
                        <input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Дата конца</label>
                        <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Ссылка на картинку</label>
                        <input
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Город</label>
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Введите город"
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Адрес</label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Введите адрес"
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Название места</label>
                        <input
                            value={placeName}
                            onChange={(e) => setPlaceName(e.target.value)}
                            placeholder="Название площадки"
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Взнос</label>
                        <input
                            value={entryFee}
                            onChange={(e) => setEntryFee(e.target.value)}
                            placeholder="Например: 1000"
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Максимум участников</label>
                        <input
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(e.target.value)}
                            placeholder="Введите число"
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Текущее число участников</label>
                        <input
                            value={currentParticipants}
                            onChange={(e) => setCurrentParticipants(e.target.value)}
                            placeholder="Введите число"
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Требования</label>
                        <input
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            placeholder="Основные требования"
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Минимальный возраст</label>
                        <input
                            value={minAge}
                            onChange={(e) => setMinAge(e.target.value)}
                            placeholder="Например: 18"
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Максимальный возраст</label>
                        <input
                            value={maxAge}
                            onChange={(e) => setMaxAge(e.target.value)}
                            placeholder="Например: 35"
                        />
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Статус</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="DRAFT">DRAFT</option>
                            <option value="OPEN">OPEN</option>
                            <option value="CLOSED">CLOSED</option>
                            <option value="FINISHED">FINISHED</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                    </div>

                    <div className="CreateCompetitionField">
                        <label>Формат</label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                        >
                            <option value="SOLO">SOLO</option>
                            <option value="TEAM">TEAM</option>
                        </select>
                    </div>

                    <div className="CreateCompetitionField">
                        <label>ID игры</label>
                        <input
                            value={gameId}
                            onChange={(e) => setGameId(e.target.value)}
                            placeholder="Введите ID игры"
                        />
                    </div>
                </div>

                <div className="CreateCompetitionActions">
                    <button
                        className="CreateCompetitionButton"
                        onClick={handleCreateCompetition}
                    >
                        Создать соревнование
                    </button>
                </div>

                {error && <div className="CreateCompetitionError">{error}</div>}
            </div>
        </div>
    )
}

export default CreateCompetitionForm