package ru.hse.efremov.competition_platform.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.GameApplication;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.exception.GlobalExceptionHandler;
import ru.hse.efremov.competition_platform.service.GameApplicationService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = GameApplicationController.class)
@org.springframework.context.annotation.Import(GlobalExceptionHandler.class)
class GameApplicationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GameApplicationService gameApplicationService;

    @MockBean
    private UserService userService;

    @MockBean
    private GameService gameService;

    @Test
    void createGameApplication_shouldReturnOk() throws Exception {
        User user = new User(
                User.Role.PARTICIPANT, "egor", "Egor", "Efremov", "Sergeevich",
                "egor@example.com", LocalDate.of(2004, 5, 17), LocalDateTime.now(),
                "+79991234567", User.Gender.MALE, "Moscow", 182.5, 74.3, "12345"
        );
        user.setId(1);

        Game game = new Game(
                "Football", "desc", "req", "SPORT", LocalDateTime.now(),
                LocalDateTime.now(), LocalDateTime.now(), "img", "Moscow",
                "Lenina 10", BigDecimal.valueOf(1500), user
        );
        game.setId(1);

        when(userService.getUser(1)).thenReturn(user);
        when(gameService.getOneGame(1)).thenReturn(game);
        doNothing().when(gameApplicationService).createApplication(any(User.class), any(Game.class));

        mockMvc.perform(post("/createGameApplication")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "userId": 1,
                                  "gameId": 1
                                }
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void getGameApplicationsByUser_shouldReturnList() throws Exception {
        User user = new User(
                User.Role.PARTICIPANT, "egor", "Egor", "Efremov", "Sergeevich",
                "egor@example.com", LocalDate.of(2004, 5, 17), LocalDateTime.now(),
                "+79991234567", User.Gender.MALE, "Moscow", 182.5, 74.3, "12345"
        );
        Game game = new Game(
                "Football", "desc", "req", "SPORT", LocalDateTime.now(),
                LocalDateTime.now(), LocalDateTime.now(), "img", "Moscow",
                "Lenina 10", BigDecimal.valueOf(1500), user
        );
        GameApplication application = new GameApplication(
                user, game, LocalDateTime.now(),
                GameApplication.ApplicationStatus.PENDING,
                GameApplication.PaymentStatus.NOT_REQUIRED,
                null
        );
        application.setId(1);

        when(gameApplicationService.getApplicationsByUserId(1)).thenReturn(List.of(application));

        mockMvc.perform(get("/getGameApplicationsByUser/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    void updateGameApplicationStatus_shouldReturnOk() throws Exception {
        doNothing().when(gameApplicationService)
                .updateApplicationStatus(eq(1), eq(GameApplication.ApplicationStatus.APPROVED));

        mockMvc.perform(patch("/updateGameApplicationStatus/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "status": "APPROVED"
                                }
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void markGameApplicationAsPaid_shouldReturnOk() throws Exception {
        doNothing().when(gameApplicationService).markAsPaidByUser(1, "http://proof");

        mockMvc.perform(patch("/markGameApplicationAsPaid/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "paymentProof": "http://proof"
                                }
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void updateGamePaymentStatus_shouldReturnOk() throws Exception {
        doNothing().when(gameApplicationService)
                .updatePaymentStatus(eq(1), eq(GameApplication.PaymentStatus.PAID));

        mockMvc.perform(patch("/updateGamePaymentStatus/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "paymentStatus": "PAID"
                                }
                                """))
                .andExpect(status().isOk());
    }
}