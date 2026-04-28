import type {Competition} from "../types/Competition.ts";

export async function getAllCompetitions(): Promise<Competition[]>{
    const response = await fetch('http://localhost:8080/getAllCompetitions')
    if(!response.ok){
        throw new Error("Не удалось загрузить соревнование")
    }
    return (await response).json();

}