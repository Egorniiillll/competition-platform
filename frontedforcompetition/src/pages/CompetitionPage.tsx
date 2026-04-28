import type {Competition} from "../types/Competition.ts";
import {useEffect, useState} from "react";
import {getAllCompetitions} from "../api/competitionApi.ts";
import CompetitionCard from "../components/CompetitionCard.tsx";


function CompetitionPage() {
    const [competitions, setCompetition] = useState<Competition[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")


    useEffect(() => {
        getAllCompetitions()
            .then((data) => {
                setCompetition(data)
                setLoading(false)
            }).catch(() => {
            setError("Ошибка загрузки")
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <h1>Загрузка...</h1>
    }
    if (error) {
        return <h1>error</h1>
    }

    return (
        <div>
            <h1>Соревнования</h1>
            {competitions.map((competition) => (
                <CompetitionCard
                    key={competition.id}
                    id={competition.id}
                    title={competition.title}
                    description={competition.description}
                    startDate={competition.startDate}
                    endDate={competition.endDate}
                    location={competition.location}
                />
            ))

            }
        </div>
    )

}

export default CompetitionPage;