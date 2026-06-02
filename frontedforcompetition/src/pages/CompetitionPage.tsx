import type { Competition } from "../types/Competition.ts";
import { useEffect, useState } from "react";
import { getAllCompetitions } from "../api/competitionApi.ts";
import CompetitionCard from "../components/CompetitionCard.tsx";
import Filter from "../components/Filter.tsx";
import "../styles/CompetitionPage.css";

function CompetitionPage() {
    const [competitions, setCompetitions] = useState<Competition[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [filterCity, setFilterCity] = useState("all")

    useEffect(() => {
        getAllCompetitions()
            .then((data) => {
                setCompetitions(data)
                setLoading(false)
            })
            .catch(() => {
                setError("Ошибка загрузки соревнований")
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    const uniqueTypes = [...new Set(competitions.map((competition) => competition.types))]
    const uniqueCities = [...new Set(competitions.map((competition) => competition.city))]

    const filteredCompetitions = competitions.filter((competition) => {
        const matchesType = filterType === "all" || competition.types === filterType
        const matchesCity = filterCity === "all" || competition.city === filterCity

        return matchesType && matchesCity
    })

    return (
        <div className="CompetitionPage">
            <h1 className="CompetitionPageTitle">Соревнования</h1>

            <Filter
                filterType={filterType}
                setFilterType={setFilterType}
                filterCity={filterCity}
                setFilterCity={setFilterCity}
                types={uniqueTypes}
                cities={uniqueCities}
            />

            <div className="CompetitionList">
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
        </div>
    )
}

export default CompetitionPage;