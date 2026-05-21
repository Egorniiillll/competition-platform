package ru.hse.efremov.competition_platform.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.hse.efremov.competition_platform.chat.ChatMessage;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.ChatMessageRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChatMessageServiceTest {

    @Mock
    private ChatMessageRepository chatMessageRepository;

    @Mock
    private GameService gameService;

    @Mock
    private CompetitionService competitionService;

    @InjectMocks
    private ChatMessageService chatMessageService;

    private User user;
    private Game game;
    private Competition competition;
    private ChatMessage gameMessage;
    private ChatMessage competitionMessage;

    @BeforeEach
    void setUp() {
        user = new User(
                User.Role.ORGANIZER,
                "egor",
                "Egor",
                "Efremov",
                "Sergeevich",
                "egor@example.com",
                LocalDate.of(2004, 5, 17),
                LocalDateTime.now(),
                "+79991234567",
                User.Gender.MALE,
                "Moscow",
                182.5,
                74.3,
                "12345"
        );
        user.setId(1);

        game = new Game(
                "Football",
                "Game description",
                "Need sport clothes",
                "SPORT",
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(1),
                LocalDateTime.now().plusDays(2),
                "img.png",
                "Moscow",
                "Lenina 10",
                BigDecimal.valueOf(1500),
                user
        );
        game.setId(1);

        competition = new Competition(
                "Cup",
                "Competition description",
                "Short description",
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(1),
                LocalDateTime.now().plusDays(2),
                "img.png",
                "Moscow",
                "Lenina 10",
                "Arena",
                BigDecimal.valueOf(2000),
                20,
                5,
                "18+",
                18,
                35,
                Competition.CompetitionStatus.OPEN,
                Competition.CompetitionFormat.SOLO,
                game,
                user
        );
        competition.setId(1);

        gameMessage = new ChatMessage(
                "egor",
                "hello game",
                LocalDateTime.now(),
                game,
                null
        );
        gameMessage.setId(1);

        competitionMessage = new ChatMessage(
                "egor",
                "hello competition",
                LocalDateTime.now(),
                null,
                competition
        );
        competitionMessage.setId(2);
    }

    @Test
    void saveGameMessage_shouldSaveMessageForGame() {
        when(gameService.getOneGame(1)).thenReturn(game);
        when(chatMessageRepository.save(any(ChatMessage.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ChatMessage result = chatMessageService.saveGameMessage(1, "egor", "hello game");

        assertNotNull(result);
        assertEquals("egor", result.getSenderName());
        assertEquals("hello game", result.getText());
        assertEquals(game, result.getGame());
        assertNull(result.getCompetition());

        verify(gameService, times(1)).getOneGame(1);
        verify(chatMessageRepository, times(1)).save(any(ChatMessage.class));
    }

    @Test
    void saveCompetitionMessage_shouldSaveMessageForCompetition() {
        when(competitionService.getOneCompetition(1)).thenReturn(competition);
        when(chatMessageRepository.save(any(ChatMessage.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ChatMessage result = chatMessageService.saveCompetitionMessage(1, "egor", "hello competition");

        assertNotNull(result);
        assertEquals("egor", result.getSenderName());
        assertEquals("hello competition", result.getText());
        assertEquals(competition, result.getCompetition());
        assertNull(result.getGame());

        verify(competitionService, times(1)).getOneCompetition(1);
        verify(chatMessageRepository, times(1)).save(any(ChatMessage.class));
    }

    @Test
    void getGameMessages_shouldReturnMessagesOfGame() {
        when(chatMessageRepository.findByGameIdOrderBySentAtAsc(1)).thenReturn(List.of(gameMessage));

        List<ChatMessage> result = chatMessageService.getGameMessages(1);

        assertEquals(1, result.size());
        assertEquals("hello game", result.get(0).getText());
        assertEquals(game, result.get(0).getGame());

        verify(chatMessageRepository, times(1)).findByGameIdOrderBySentAtAsc(1);
    }

    @Test
    void getCompetitionMessages_shouldReturnMessagesOfCompetition() {
        when(chatMessageRepository.findByCompetitionIdOrderBySentAtAsc(1)).thenReturn(List.of(competitionMessage));

        List<ChatMessage> result = chatMessageService.getCompetitionMessages(1);

        assertEquals(1, result.size());
        assertEquals("hello competition", result.get(0).getText());
        assertEquals(competition, result.get(0).getCompetition());

        verify(chatMessageRepository, times(1)).findByCompetitionIdOrderBySentAtAsc(1);
    }
}