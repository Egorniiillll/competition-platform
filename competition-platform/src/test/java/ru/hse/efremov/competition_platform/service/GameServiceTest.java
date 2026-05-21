package ru.hse.efremov.competition_platform.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.GameRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GameServiceTest {

    @Mock
    private GameRepository gameRepository;

    @InjectMocks
    private GameService gameService;

    private User organizer;
    private Game game;

    @BeforeEach
    void setUp() {
        organizer = new User(
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
        organizer.setId(1);

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
                organizer
        );
        game.setId(1);
    }

    @Test
    void createNewGame_shouldSaveGame() {
        gameService.createNewGame(
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
                organizer
        );

        verify(gameRepository, times(1)).save(any(Game.class));
    }

    @Test
    void getOneGame_shouldReturnGame() {
        when(gameRepository.findById(1)).thenReturn(Optional.of(game));

        Game result = gameService.getOneGame(1);

        assertEquals("Football", result.getName());
        assertEquals("Moscow", result.getCity());
    }

    @Test
    void getAllGames_shouldReturnAllGames() {
        when(gameRepository.findAll()).thenReturn(List.of(game));

        List<Game> result = gameService.getAllGames();

        assertEquals(1, result.size());
        assertEquals("Football", result.get(0).getName());
    }

    @Test
    void getGamesByOrganizer_shouldReturnGamesOfOrganizer() {
        when(gameRepository.findByOrganizerId(1)).thenReturn(List.of(game));

        List<Game> result = gameService.getGamesByOrganizer(1);

        assertEquals(1, result.size());
        assertEquals("Football", result.get(0).getName());
    }

    @Test
    void createNewGameAndRev_shouldReturnSavedGame() {
        when(gameRepository.save(any(Game.class))).thenReturn(game);

        Game result = gameService.createNewGameAndRev(
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
                organizer
        );

        assertNotNull(result);
        assertEquals("Football", result.getName());
    }
}