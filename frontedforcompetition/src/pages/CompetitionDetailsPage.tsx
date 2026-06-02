import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import type { Competition } from "../types/Competition.ts";
import type { CompetitionApplication } from "../types/CompetitionApplication.ts";
import { getOneCompetition } from "../api/competitionApi.ts";
import { getCompetitionApplicationsByUser } from "../api/competitionApplicationApi.ts";
import JoinCompetitionForm from "../components/JoinCompetitionForm.tsx";
import CompetitionChat from "../components/CompetitionChat.tsx";

import "../styles/CompetitionDetailsPage.css";

function CompetitionDetailsPage() {
    const { id } = useParams()

    const [competition, setCompetition] = useState<Competition | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [application, setApplication] = useState<CompetitionApplication | null>(null)

    const loadApplication = useCallback(async () => {
        const currentUserId = localStorage.getItem("currentUserId")
        if (!id || !currentUserId) {
            return
        }

        const applicationsData = await getCompetitionApplicationsByUser(Number(currentUserId))
        const currentApplication = applicationsData.find(
            (item) => item.competition.id === Number(id)
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
            getOneCompetition(Number(id)),
            getCompetitionApplicationsByUser(Number(currentUserId))
        ])
            .then(([competitionData, applicationsData]) => {
                setCompetition(competitionData)

                const currentApplication = applicationsData.find(
                    (item) => item.competition.id === Number(id)
                )
                setApplication(currentApplication || null)
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
                    <p><strong>Создано:</strong> {competition?.createdAt}</p>
                    <p><strong>Начало:</strong> {competition?.startDate}</p>
                    <p><strong>Город:</strong> {competition?.city}</p>
                    <p><strong>Адрес:</strong> {competition?.address}</p>
                    <p><strong>Взнос:</strong> {competition?.entryFee}</p>
                    {!application && (
                        <>
                            <button onClick={() => setShowForm(true)}>
                                Участвовать
                            </button>
                            {showForm && competition?.id && (
                                <JoinCompetitionForm
                                    competitionId={competition.id}
                                    onSuccess={async () => {
                                        setShowForm(false)
                                        setMessage("Заявка успешно отправлена")
                                        await loadApplication()
                                    }}
                                />
                            )}
                        </>
                    )}

                    {application && (
                        <div>
                            <p><strong>Статус заявки:</strong> {application.status}</p>
                            {application.status === "PENDING" && (
                                <p>заявка отправлена ожидает подтверждения организатором.</p>
                            )}
                            {application.status === "REJECTED" && (
                                <p>заявка отклонена.</p>
                            )}
                            {application.status === "APPROVED" && competition?.id && (
                                <CompetitionChat
                                    competitionId={competition.id}
                                    title={competition.title}
                                />
                            )}
                        </div>
                    )}
                    {message && <p>{message}</p>}
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default CompetitionDetailsPage
