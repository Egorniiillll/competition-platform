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

export async function createUser(user: {
    username: string
    firstName: string
    secondName: string
    thirdName: string
    email: string
    password: string
    birthdayDate: string
    personalPhone: string
    gender: string
    city: string
    height: string
    weight: string
    role: string
}): Promise<void> {
    const now = new Date()
    const pad = (value: number) => String(value).padStart(2, "0")
    const dateOfRegistration =
        `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
        `T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

    const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...user,
            dateOfRegistration
        })
    })
    if (!response.ok) {
        throw new Error("Не удалось создать пользователя")
    }
}

export async function loginUser(login: string, password: string): Promise<User> {
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: login.trim(),
            email: login.trim(),
            password
        })
    })
    if (!response.ok) {
        throw new Error("неверная почта или пароль")
    }
    return response.json()
}