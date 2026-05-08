import type { CompetitionApplication } from "../types/CompetitionApplication.ts";

export async function createCompetitionApplication(userId: number, competitionId: number): Promise<void> {
    const response = await fetch("http://localhost:8080/createCompetitionApplication", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: String(userId),
            competitionId: String(competitionId)
        })
    })

    if (!response.ok) {
        throw new Error("Не удалось создать заявку на соревнование")
    }
}

export async function getCompetitionApplicationsByUser(userId: number): Promise<CompetitionApplication[]> {
    const response = await fetch(`http://localhost:8080/getCompetitionApplicationsByUser/${userId}`)

    if (!response.ok) {
        throw new Error("Не удалось загрузить заявки на соревнования")
    }

    return response.json()
}
export async function getCompetitionApplicationsByOrganizer(organizerId: number): Promise<CompetitionApplication[]> {
    const response = await fetch(`http://localhost:8080/getCompetitionApplicationsByOrganizer/${organizerId}`)

    if (!response.ok) {
        throw new Error("е удалось загрузить на соревнования орг")
    }

    return response.json()
}