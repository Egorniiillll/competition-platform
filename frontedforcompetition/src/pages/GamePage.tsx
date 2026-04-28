import GameCard from "../components/GameCard.tsx";
import {useEffect, useState} from "react";
import "../styles/GamePage.css";

import type {Game} from "../types/Game.ts";
import {getAllGames} from "../api/gameApi.ts";
import Filter from "../components/Filter.tsx";

function GamePage() {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [filterType, setFilterType]= useState("all")

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

    const filterGames = games.filter((game) =>{
        if(filterType === "all"){
            return true;
        }
        return game.types === filterType
    })


    return (
        <div className="GamePage">
            <h1>Игры</h1>
            <Filter filterType={filterType} setFilterType={setFilterType}/>
            {filterGames.map((game) => (
                <GameCard
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    description={game.description}
                    types={game.types}
                    createdAt={game.createdAt}
                />
            ))}
        </div>
    )
}

export default GamePage;