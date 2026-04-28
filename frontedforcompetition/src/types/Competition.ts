import type {Game} from "./Game.ts";

export type Competition = {
    id: number
    title: string
    description: string
    location: string
    startDate: string
    endDate: string
    game: Game
}