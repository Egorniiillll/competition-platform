import type {Game} from "../types/Game.ts";


export async function getAllGames(): Promise<Game[]> {

    const response = await fetch(`http://localhost:8080/getAllGames`)

    if (! response.ok) {
        throw new Error("Не удалось загрузить игры")
    }

    return (await response).json();
}