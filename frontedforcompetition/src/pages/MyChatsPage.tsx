import { useEffect, useState } from "react";
import { getUser } from "../api/userApi.ts";
import { getGameApplicationsByUser } from "../api/gameApplicationApi.ts";
import { getCompetitionApplicationsByUser } from "../api/competitionApplicationApi.ts";
import { getGamesByOrganizer } from "../api/gameApi.ts";
import { getCompetitionsByOrganizer } from "../api/competitionApi.ts";
import GameChat from "../components/GameChat.tsx";
import CompetitionChat from "../components/CompetitionChat.tsx";
import type { Game } from "../types/Game.ts";
import type { Competition } from "../types/Competition.ts";
import type { GameApplication } from "../types/GameApplication.ts";
import type { CompetitionApplication } from "../types/CompetitionApplication.ts";
import "../styles/MyChatsPage.css";

type ChatItem =
    | {
    type: "game"
    id: number
    title: string
}
    | {
    type: "competition"
    id: number
    title: string
}

function MyChatsPage() {
    const [chatItems, setChatItems] = useState<ChatItem[]>([])
    const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const currentUserId = localStorage.getItem("currentUserId")

    useEffect(() => {
        if (!currentUserId) {
            setError("Пользователь не выбран")
            setLoading(false)
            return
        }
        getUser(Number(currentUserId))
            .then((userData) => {
                if (userData.role === "PARTICIPANT") {
                    return Promise.all([
                        getGameApplicationsByUser(Number(currentUserId)),
                        getCompetitionApplicationsByUser(Number(currentUserId))
                    ]).then(([gameApplications, competitionApplications]) => {
                        const approvedGames: ChatItem[] = gameApplications
                            .filter((application: GameApplication) => application.status === "APPROVED")
                            .map((application: GameApplication) => ({
                                type: "game",
                                id: application.game.id,
                                title: application.game.name
                            }))

                        const approvedCompetitions: ChatItem[] = competitionApplications
                            .filter((application: CompetitionApplication) => application.status === "APPROVED")
                            .map((application: CompetitionApplication) => ({
                                type: "competition",
                                id: application.competition.id,
                                title: application.competition.title
                            }))

                        const allChats = [...approvedGames, ...approvedCompetitions]
                        setChatItems(allChats)

                        if (allChats.length > 0) {
                            setSelectedChat(allChats[0])
                        }
                    })
                }

                if (userData.role === "ORGANIZER") {
                    return Promise.all([
                        getGamesByOrganizer(Number(currentUserId)),
                        getCompetitionsByOrganizer(Number(currentUserId))
                    ]).then(([games, competitions]) => {
                        const gameChats: ChatItem[] = games.map((game: Game) => ({
                            type: "game",
                            id: game.id,
                            title: game.name
                        }))
                        const competitionChats: ChatItem[] = competitions.map((competition: Competition) => ({
                            type: "competition",
                            id: competition.id,
                            title: competition.title
                        }))
                        const allChats = [...gameChats, ...competitionChats]
                        setChatItems(allChats)
                        if (allChats.length > 0) {
                            setSelectedChat(allChats[0])
                        }
                    })
                }
            })
            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                setError("Ошибка загрузки чатов")
                setLoading(false)
            })
    }, [currentUserId])

    if (loading) {
        return <h1 className="MyChatsPageLoading">Загрузка...</h1>
    }
    if (error) {
        return <h1 className="MyChatsPageError">{error}</h1>
    }

    return (
        <div className="MyChatsPage">
            <div className="MyChatsCard">
                <div className="MyChatsSidebar">
                    <h1 className="MyChatsTitle">Мои чаты</h1>
                    {chatItems.length === 0 ? (
                        <div className="MyChatsEmpty">Доступных чатов пока нет</div>
                    ) : (
                        <div className="MyChatsList">
                            {chatItems.map((chat) => (
                                <button
                                    key={`${chat.type}-${chat.id}`}
                                    className={
                                        selectedChat?.type === chat.type && selectedChat?.id === chat.id
                                            ? "MyChatsItem ActiveChatItem"
                                            : "MyChatsItem"
                                    }
                                    onClick={() => setSelectedChat(chat)}
                                >
                                    <span className="MyChatsItemType">
                                        {chat.type === "game" ? "Игра" : "Соревнование"}
                                    </span>
                                    <span className="MyChatsItemTitle">{chat.title}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="MyChatsContent">
                    {!selectedChat && (
                        <div className="MyChatsPlaceholder">
                            Выберите чат слева
                        </div>
                    )}
                    {selectedChat?.type === "game" && (
                        <GameChat gameId={selectedChat.id} title={selectedChat.title} />
                    )}
                    {selectedChat?.type === "competition" && (
                        <CompetitionChat competitionId={selectedChat.id} title={selectedChat.title} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyChatsPage