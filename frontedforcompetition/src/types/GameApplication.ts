import type { User } from "./User.ts"
import type { Game } from "./Game.ts"

export type GameApplication = {
    id: number
    user: User
    game: Game
    createdAt: string
    status: string
    paymentStatus: string
    paymentProof: string | null
}