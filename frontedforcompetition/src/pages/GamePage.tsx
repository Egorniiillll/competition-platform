import GameCard from "../components/GameCard.tsx";
import Filter from "../components/Filter.tsx";
import { useEffect, useState } from "react";
import "../styles/GamePage.css";

import type { Game } from "../types/Game.ts";
import { getAllGames } from "../api/gameApi.ts";

function GamePage() {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [filterCity, setFilterCity] = useState("all")

    useEffect(() => {
        getAllGames()
            .then((data) => {
                setGames(data)
                setLoading(false)
            })
            .catch(() => {
                setError("Ошибка загрузки игр")
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    const uniqueTypes = [...new Set(games.map((game) => game.types))]
    const uniqueCities = [...new Set(games.map((game) => game.city))]

    const filteredGames = games.filter((game) => {
        const matchesType = filterType === "all" || game.types === filterType
        const matchesCity = filterCity === "all" || game.city === filterCity

        return matchesType && matchesCity
    })

    return (
        <div className="GamePage">
            <h1 className="GamePageTitle">Игры</h1>

            <Filter
                filterType={filterType}
                setFilterType={setFilterType}
                filterCity={filterCity}
                setFilterCity={setFilterCity}
                types={uniqueTypes}
                cities={uniqueCities}
            />

            <div className="GameList">
                {filteredGames.map((game) => (
                    <GameCard
                        key={game.id}
                        id={game.id}
                        imageURL={game.imageURL}
                        name={game.name}
                        description={game.description}
                        types={game.types}
                        createdAt={game.createdAt}
                        startDate={game.startDate}
                        endDate={game.endDate}
                        city={game.city}
                        address={game.address}
                        price={game.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default GamePage;