import type { Game } from "./Game.ts";
import type { User } from "./User.ts";

export type GameApplication = {
    id: number
    user: User
    game: Game
    createdAt: string
    status: string
}