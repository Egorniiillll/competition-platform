package ru.hse.efremov.competition_platform.service;

import org.springframework.stereotype.Service;
import ru.hse.efremov.competition_platform.chat.ChatMessage;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.repository.ChatMessageRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final GameService gameService;
    private final CompetitionService competitionService;
    public ChatMessageService(ChatMessageRepository chatMessageRepository,
                              GameService gameService,
                              CompetitionService competitionService) {
        this.chatMessageRepository = chatMessageRepository;
        this.gameService = gameService;
        this.competitionService = competitionService;
    }
    public ChatMessage saveGameMessage(Integer gameId, String senderName, String text) {
        Game game = gameService.getOneGame(gameId);
        ChatMessage message = new ChatMessage(
                senderName,
                text,
                LocalDateTime.now(),
                game,
                null
        );
        return chatMessageRepository.save(message);
    }


    public ChatMessage saveCompetitionMessage(Integer competitionId, String senderName, String text) {
        Competition competition = competitionService.getOneCompetition(competitionId);

        ChatMessage message = new ChatMessage(
                senderName,
                text,
                LocalDateTime.now(),
                null,
                competition
        );
        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getGameMessages(Integer gameId) {
        return chatMessageRepository.findByGameIdOrderBySentAtAsc(gameId);
    }


    public List<ChatMessage> getCompetitionMessages(Integer competitionId) {
        return chatMessageRepository.findByCompetitionIdOrderBySentAtAsc(competitionId);
    }
}