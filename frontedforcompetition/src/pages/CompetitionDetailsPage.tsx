import { useParams } from "react-router-dom";


import "../styles/CompetitionDetailsPage.css";
import {useEffect, useState} from "react";
import type {Competition} from "../types/Competition.ts";
import {getOneCompetition} from "../api/competitionApi.ts";
import JoinCompetitionForm from "../components/JoinCompetitionForm.tsx";

function CompetitionDetailsPage() {
    const { id } = useParams();

    const [competition, setCompetition] = useState<Competition | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        if (!id) {
            return
        }

        getOneCompetition(Number(id))
            .then((data) => {
                setCompetition(data)
                setLoading(false)
            })
            .catch(() => {
                setError("Ошибка загрузки соревнования")
                setLoading(false)
            })
    }, [id])


    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (error && !competition) {
        return <h1>{error}</h1>
    }


    return (

        <div className="CompetitionDetailsPage">


            <div className="CompetitionDetailsCard">
                <div className="CompetitionDetailsImageBlock">
                    {competition?.imageURL && (
                        <img
                            src={competition.imageURL}
                            alt={competition.title}
                            className="GameDetailsImage"
                        />
                    )}
                </div>

                <div className="CompetitionDetailsContent">
                    <h1>{competition?.title}</h1>
                    <p><strong>Описание:</strong> {competition?.description}</p>
                    <p><strong>Условия:</strong> {competition?.requirements}</p>
                    <p><strong>Тип:</strong> {competition?.types}</p>
                    <p><strong>Создано:</strong> {competition?.createdAt}</p>
                    <p><strong>Начало:</strong> {competition?.startDate}</p>
                    <p><strong>Город:</strong> {competition?.city}</p>
                    <p><strong>Адрес:</strong> {competition?.address}</p>
                    <p><strong>Цена:</strong> {competition?.price}</p>

                    <button onClick={() => setShowForm(true)}>
                        Участвовать
                    </button>
                    {showForm && competition?.id && (
                        <JoinCompetitionForm
                            competitionId={competition.id}
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

export default CompetitionDetailsPage;