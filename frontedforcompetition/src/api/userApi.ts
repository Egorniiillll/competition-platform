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