import { useEffect, useRef, useState } from "react";
import { Client, type IMessage } from "@stomp/stompjs";
import "../styles/GlobalChat.css";

type ChatMessage = {
    id: number
    senderName: string
    text: string
    sentAt: string
}

function GlobalChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [text, setText] = useState("")
    const [error, setError] = useState("")
    const clientRef = useRef<Client | null>(null)

    useEffect(() => {
        fetch("http://localhost:8080/chat/messages")
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
                stompClient.subscribe("/topic/messages", (message: IMessage) => {
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
    }, [])

    function handleSend() {
        if (!clientRef.current || !clientRef.current.connected || !text.trim()) {
            return
        }

        const currentUserId = localStorage.getItem("currentUserId")
        const senderName = currentUserId ? `user-${currentUserId}` : "anonymous"

        clientRef.current.publish({
            destination: "/app/chat.send",
            body: JSON.stringify({
                senderName,
                text
            })
        })

        setText("")
    }

    return (
        <div className="GlobalChat">
            <h2>Общий чат</h2>

            {error && <p>{error}</p>}

            <div className="GlobalChatMessages">
                {messages.map((message) => (
                    <div key={message.id} className="GlobalChatMessage">
                        <strong>{message.senderName}</strong>
                        <p>{message.text}</p>
                        <small>{message.sentAt}</small>
                    </div>
                ))}
            </div>

            <div className="GlobalChatForm">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введите сообщение"
                />
                <button onClick={handleSend}>Отправить</button>
            </div>
        </div>
    )
}

export default GlobalChat