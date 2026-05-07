import type { Competition } from "../types/Competition.ts";
import { useEffect, useState } from "react";
import { getAllCompetitions } from "../api/competitionApi.ts";
import CompetitionCard from "../components/CompetitionCard.tsx";
import "../styles/CompetitionPage.css";

function CompetitionPage() {
    const [competitions, setCompetition] = useState<Competition[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filterCity, setFilterCity] = useState("all")

    useEffect(() => {
        getAllCompetitions()
            .then((data) => {
                setCompetition(data)
                setLoading(false)
            })
            .catch(() => {
                setError("Ошибка загрузки")
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    const uniqueCities = [...new Set(competitions.map((competition) => competition.city))]

    const filteredCompetitions = competitions.filter((competition) => {
        return filterCity === "all" || competition.city === filterCity
    })

    return (
        <div className="CompetitionPage">


            <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
                <option value="all">Все города</option>
                {uniqueCities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>

            {filteredCompetitions.map((competition) => (
                <CompetitionCard
                    key={competition.id}
                    id={competition.id}
                    title={competition.title}
                    description={competition.description}
                    shortDescription={competition.shortDescription}
                    createdAt={competition.createdAt}
                    startDate={competition.startDate}
                    endDate={competition.endDate}
                    city={competition.city}
                    address={competition.address}
                    entryFee={competition.entryFee}
                    imageURL={competition.imageURL}
                />
            ))}
        </div>
    )
}

export default CompetitionPage;