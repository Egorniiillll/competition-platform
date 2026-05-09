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
        throw new Error("не удалось создать заявку ")
    }
}

export async function getCompetitionApplicationsByUser(userId: number): Promise<CompetitionApplication[]> {
    const response = await fetch(`http://localhost:8080/getCompetitionApplicationsByUser/${userId}`)

    if (!response.ok) {
        throw new Error("не удалось загрузить заявки")
    }

    return response.json()
}

export async function getCompetitionApplicationsByOrganizer(organizerId: number): Promise<CompetitionApplication[]> {
    const response = await fetch(`http://localhost:8080/getCompetitionApplicationsByOrganizer/${organizerId}`)

    if (!response.ok) {
        throw new Error("не удалось загрузить заявки на соревнования")
    }

    return response.json()
}

export async function updateCompetitionApplicationStatus(applicationId: number, status: string): Promise<void> {
    const response = await fetch(`http://localhost:8080/updateCompetitionApplicationStatus/${applicationId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
    })

    if (!response.ok) {
        throw new Error("не удалось обновить статус")
    }
}

export async function markCompetitionApplicationAsPaid(
    applicationId: number,
    paymentProof: string
): Promise<void> {
    const response = await fetch(`http://localhost:8080/markCompetitionApplicationAsPaid/${applicationId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ paymentProof })
    })

    if (!response.ok) {
        throw new Error("не удалось отправить подтверждение")
    }
}

export async function updateCompetitionPaymentStatus(
    applicationId: number,
    paymentStatus: string
): Promise<void> {
    const response = await fetch(`http://localhost:8080/updateCompetitionPaymentStatus/${applicationId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ paymentStatus })
    })

    if (!response.ok) {
        throw new Error("не удалось обновить статус оплты")
    }
}