import type {User} from "../types/User.ts";

export async function getUser(id: number): Promise<User> {

    const response = await fetch(`http://localhost:8080/user/${id}`)

    if (! response.ok) {
        throw new Error("Не удалось загрузить пользователя")
    }

    return (await response).json();
}

export async function getALlUser(): Promise<User[]> {

    const response = await fetch(`http://localhost:8080/userAll`)

    if (! response.ok) {
        throw new Error("Не удалось загрузить пользователя")
    }

    return (await response).json();
}


export async function updateUser(id: number, user: {
    username: string
    firstName: string
    secondName: string
    thirdName: string
    email: string
    birthdayDate: string
    personalPhone: string
    gender: string
    city: string
    height: number
    weight: number
}): Promise<User> {
    const response = await fetch(`http://localhost:8080/user/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    if (!response.ok) {
        throw new Error("не получилось обновить профиль")
    }
    return response.json()

}