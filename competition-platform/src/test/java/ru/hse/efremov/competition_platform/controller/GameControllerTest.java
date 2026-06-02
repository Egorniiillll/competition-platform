package ru.hse.efremov.competition_platform.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.exception.GlobalExceptionHandler;
import ru.hse.efremov.competition_platform.service.GameService;
import ru.hse.efremov.competition_platform.service.UserService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = GameConroller.class)
@org.springframework.context.annotation.Import(GlobalExceptionHandler.class)
class GameConrollerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private GameService gameService;

    @MockitoBean
    private UserService userService;

    @Test
    void getOneGame_shouldReturnGame() throws Exception {
        User organizer = new User(
                User.Role.ORGANIZER, "egor", "Egor", "Efremov", "Sergeevich",
                "egor@example.com", LocalDate.of(2004, 5, 17), LocalDateTime.now(),
                "+79991234567", User.Gender.MALE, "Moscow", 182.5, 74.3, "12345"
        );

        Game game = new Game(
                "Football", "desc", "req", "SPORT", LocalDateTime.now(),
                LocalDateTime.now(), LocalDateTime.now(), "img", "Moscow",
                "Lenina 10", BigDecimal.valueOf(1500), organizer
        );
        game.setId(1);

        when(gameService.getOneGame(1)).thenReturn(game);

        mockMvc.perform(get("/getOneGame/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Football"));
    }

    @Test
    void getAllGames_shouldReturnList() throws Exception {
        User organizer = new User(
                User.Role.ORGANIZER, "egor", "Egor", "Efremov", "Sergeevich",
                "egor@example.com", LocalDate.of(2004, 5, 17), LocalDateTime.now(),
                "+79991234567", User.Gender.MALE, "Moscow", 182.5, 74.3, "12345"
        );

        Game game = new Game(
                "Football", "desc", "req", "SPORT", LocalDateTime.now(),
                LocalDateTime.now(), LocalDateTime.now(), "img", "Moscow",
                "Lenina 10", BigDecimal.valueOf(1500), organizer
        );
        game.setId(1);

        when(gameService.getAllGames()).thenReturn(List.of(game));

        mockMvc.perform(get("/getAllGames"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Football"));
    }

    @Test
    void getGamesByOrganizer_shouldReturnList() throws Exception {
        User organizer = new User(
                User.Role.ORGANIZER, "egor", "Egor", "Efremov", "Sergeevich",
                "egor@example.com", LocalDate.of(2004, 5, 17), LocalDateTime.now(),
                "+79991234567", User.Gender.MALE, "Moscow", 182.5, 74.3, "12345"
        );

        Game game = new Game(
                "Football", "desc", "req", "SPORT", LocalDateTime.now(),
                LocalDateTime.now(), LocalDateTime.now(), "img", "Moscow",
                "Lenina 10", BigDecimal.valueOf(1500), organizer
        );
        game.setId(1);

        when(gameService.getGamesByOrganizer(1)).thenReturn(List.of(game));

        mockMvc.perform(get("/getGamesByOrganaizerId/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Football"));
    }

    @Test
    void createGame_shouldReturnOk() throws Exception {
        User organizer = new User(
                User.Role.ORGANIZER, "egor", "Egor", "Efremov", "Sergeevich",
                "egor@example.com", LocalDate.of(2004, 5, 17), LocalDateTime.now(),
                "+79991234567", User.Gender.MALE, "Moscow", 182.5, 74.3, "12345"
        );
        organizer.setId(1);

        when(userService.getUser(1)).thenReturn(organizer);
        doNothing().when(gameService).createNewGame(
                anyString(), anyString(), anyString(), anyString(),
                any(), any(), any(), anyString(), anyString(), anyString(),
                any(), any(User.class)
        );

        mockMvc.perform(post("/createGame")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "Football",
                                  "description": "desc",
                                  "requirement": "req",
                                  "types": "SPORT",
                                  "startDate": "2026-05-18T12:00:00",
                                  "endDate": "2026-05-18T15:00:00",
                                  "imageURL": "img",
                                  "city": "Moscow",
                                  "address": "Lenina 10",
                                  "price": "1500",
                                  "organizerId": "1"
                                }
                                """))
                .andExpect(status().isOk());
    }
}