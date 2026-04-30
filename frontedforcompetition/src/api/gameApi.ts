import type {Game} from "../types/Game.ts";


export async function getAllGames(): Promise<Game[]> {

    const response = await fetch(`http://localhost:8080/getAllGames`)

    if (! response.ok) {
        throw new Error("Не удалось загрузить игры")
    }

    return (await response).json();
}

export async function getOneGame(id: number): Promise<Game> {

    const response = await fetch(`http://localhost:8080/getOneGame/${id}`)

    if (! response.ok) {
        throw new Error("Не удалось загрузить игру")
    }

    return (await response).json();
}