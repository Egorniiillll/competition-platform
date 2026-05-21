package ru.hse.efremov.competition_platform.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
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
    @GetMapping("/chat/game/{gameId}")
    public List<ChatMessage> getGameMessages(@PathVariable Integer gameId) {
        return chatMessageService.getGameMessages(gameId);
    }

    @GetMapping("/chat/competition/{competitionId}")
    public List<ChatMessage> getCompetitionMessages(@PathVariable Integer competitionId) {
        return chatMessageService.getCompetitionMessages(competitionId);
    }

    @MessageMapping("/game-chat/{gameId}")
    @SendTo("/topic/game-chat/{gameId}")
    public ChatMessage sendGameMessage(@DestinationVariable Integer gameId, Map<String, String> body) {
        String senderName = body.get("senderName");
        String text = body.get("text");
        return chatMessageService.saveGameMessage(gameId, senderName, text);
    }

    @MessageMapping("/competition-chat/{competitionId}")
    @SendTo("/topic/competition-chat/{competitionId}")
    public ChatMessage sendCompetitionMessage(@DestinationVariable Integer competitionId, Map<String, String> body) {
        String senderName = body.get("senderName");
        String text = body.get("text");


        return chatMessageService.saveCompetitionMessage(competitionId, senderName, text);
    }
}