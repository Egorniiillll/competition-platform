import type {Competition} from "../types/Competition.ts";



export async function getAllCompetitions(): Promise<Competition[]>{
    const response = await fetch('http://localhost:8080/getAllCompetitions')
    if(!response.ok){
        throw new Error("Не удалось загрузить соревнование")
    }
    return (await response).json();

}

export async function getOneCompetition(id: number): Promise<Competition> {

    const response = await fetch(`http://localhost:8080/getOneCompetition/${id}`)

    if (! response.ok) {
        throw new Error("Не удалось загрузить соревнования")
    }

    return (await response).json();
}

export async function createCompetition(competition: {
    title: string
    description: string
    shortDescription: string
    createdAt: string
    startDate: string
    endDate: string
    imageURL: string
    city: string
    address: string
    placeName: string
    entryFee: string
    maxParticipants: string
    currentParticipants: string
    requirements: string
    minAge: string
    maxAge: string
    status: string
    format: string
    gameId: number
    organizerId: number
}): Promise<void> {
    const response = await fetch("http://localhost:8080/createCompetition", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(competition)
    })

    if (!response.ok) {
        throw new Error("Не удалось создать соревнование")
    }
}

export async function getCompetitionsByOrganizer(id: number): Promise<Competition[]> {
    const response = await fetch(`http://localhost:8080/getCompetitionsByOrganaizerId/${id}`)
    if (!response.ok) {
        throw new Error("не удалось загрузить соревнования организатора")
    }
    return response.json()
}