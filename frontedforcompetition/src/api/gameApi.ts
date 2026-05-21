import type { Game } from "../types/Game.ts";

export async function getAllGames(): Promise<Game[]> {
    const response = await fetch(`http://localhost:8080/getAllGames`)
    if (!response.ok) {
        throw new Error("Не удалось загрузить игры")
    }

    return response.json()
}

export async function getOneGame(id: number): Promise<Game> {
    const response = await fetch(`http://localhost:8080/getOneGame/${id}`)
    if (!response.ok) {
        throw new Error("Не удалось загрузить игру")
    }
    return response.json()
}

export async function createGame(game: {
    name: string
    description: string
    requirement: string
    types: string
    startDate: string
    endDate: string
    imageURL: string
    city: string
    address: string
    price: string
    organizerId: number
}): Promise<void> {
    const response = await fetch("http://localhost:8080/createGame", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    })

    if (!response.ok) {
        throw new Error("Не удалось создать игру")
    }
}

export async function getGamesByOrganizer(id: number): Promise<Game[]> {
    const response = await fetch(`http://localhost:8080/getGamesByOrganaizerId/${id}`)

    if (!response.ok) {
        throw new Error("Не удалось загрузить игры организатора")
    }

    return response.json()
}