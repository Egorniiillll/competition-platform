import type { Competition } from "./Competition.ts";
import type { User } from "./User.ts";

export type CompetitionApplication = {
    id: number
    user: User
    competition: Competition
    createdAt: string
    status: string
    paymentStatus: string
    paymentProof: string | null
}