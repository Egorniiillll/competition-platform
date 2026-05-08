import type { GameApplication } from "../types/GameApplication.ts";

export async function createGameApplication(userId: number, gameId: number): Promise<void> {
    const response = await fetch("http://localhost:8080/createGameApplication", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: String(userId),
            gameId: String(gameId)
        })
    })

    if (!response.ok) {
        throw new Error("Не удалось создать заявку")
    }
}

export async function getGameApplicationsByUser(userId: number): Promise<GameApplication[]> {
    const response = await fetch(`http://localhost:8080/getGameApplicationsByUser/${userId}`)

    if (!response.ok) {
        throw new Error("не удалось загрузить заявки")
    }

    return response.json()
}

export async function getGameApplicationsByOrganizer(organizerId: number) {
    const response = await fetch(`http://localhost:8080/getGameApplicationsByOrganizer/${organizerId}`)
    if (!response.ok) {
        throw new Error("не удалось загрузить заявки организатора")
    }

    return response.json()
}

export async function updateGameApplicationStatus(
    applicationId: number,
    status: string
): Promise<void> {
    const response = await fetch(`http://localhost:8080/updateGameApplicationStatus/${applicationId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    })

    if (!response.ok) {
        throw new Error("заявки не обновиось ")
    }
}