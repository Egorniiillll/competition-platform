package ru.hse.efremov.competition_platform.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.hse.efremov.competition_platform.chat.ChatMessage;
import ru.hse.efremov.competition_platform.service.ChatMessageService;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {
    private final ChatMessageService chatMessageService;

    public ChatController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @GetMapping("/chat/messages")
    public List<ChatMessage> getAllMessages() {
        return chatMessageService.getAllMessages();
    }

    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(Map<String, String> body) {
        String senderName = body.get("senderName");
        String text = body.get("text");

        return chatMessageService.saveMessage(senderName, text);
    }
}