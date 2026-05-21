import { useEffect, useRef, useState } from "react";
import { Client, type IMessage } from "@stomp/stompjs";
import "../styles/EventChat.css";

type ChatMessage = {
    id: number
    senderName: string
    text: string
    sentAt: string
}

type GameChatProps = {
    gameId: number
    title: string
}

function GameChat({ gameId, title }: GameChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [text, setText] = useState("")
    const [error, setError] = useState("")
    const clientRef = useRef<Client | null>(null)

    useEffect(() => {
        fetch(`http://localhost:8080/chat/game/${gameId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error()
                }
                return response.json()
            })
            .then((data) => {
                setMessages(data)
            })
            .catch(() => {
                setError("Не удалось загрузить сообщения")
            })

        const stompClient = new Client({
            brokerURL: "ws://localhost:8080/chat",
            reconnectDelay: 5000,
            onConnect: () => {
                stompClient.subscribe(`/topic/game-chat/${gameId}`, (message: IMessage) => {
                    const body: ChatMessage = JSON.parse(message.body)
                    setMessages((prev) => [...prev, body])
                })
            },
            onStompError: () => {
                setError("Ошибка подключения к чату")
            }
        })
        clientRef.current = stompClient
        stompClient.activate()

        return () => {
            stompClient.deactivate()
        }
    }, [gameId])

    function handleSend() {
        if (!clientRef.current || !clientRef.current.connected || !text.trim()) {
            return
        }
        const currentUserId = localStorage.getItem("currentUserId")
        const senderName = currentUserId ? `user-${currentUserId}` : "anonymous"
        clientRef.current.publish({
            destination: `/app/game-chat/${gameId}`,
            body: JSON.stringify({
                senderName,
                text
            })
        })

        setText("")
    }
    return (
        <div className="EventChat">
            <div className="EventChatHeader">
                <h2 className="EventChatTitle">Чат игры</h2>
                <p className="EventChatSubtitle">{title}</p>
            </div>

            {error && <div className="EventChatError">{error}</div>}

            <div className="EventChatMessages">
                {messages.length === 0 ? (
                    <div className="EventChatEmpty">Сообщений пока нет</div>
                ) : (
                    messages.map((message) => (
                        <div key={message.id} className="EventChatMessage">
                            <div className="EventChatMessageHeader">
                                <strong>{message.senderName}</strong>
                                <span>{message.sentAt}</span>
                            </div>
                            <p>{message.text}</p>
                        </div>
                    ))
                )}
            </div>
            <div className="EventChatForm">
                <input
                    className="EventChatInput"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введите сообщение"
                />
                <button className="EventChatButton" onClick={handleSend}>
                    Отправить
                </button>
            </div>
        </div>
    )
}

export default GameChat