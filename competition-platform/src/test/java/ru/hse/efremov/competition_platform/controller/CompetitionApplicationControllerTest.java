package ru.hse.efremov.competition_platform.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.CompetitionApplication;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.service.CompetitionApplicationService;
import ru.hse.efremov.competition_platform.service.CompetitionService;
import ru.hse.efremov.competition_platform.service.UserService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CompetitionApplicationController.class)
class CompetitionApplicationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompetitionApplicationService competitionApplicationService;

    @MockBean
    private UserService userService;

    @MockBean
    private CompetitionService competitionService;

    @Test
    void createCompetitionApplication_shouldReturnOk() throws Exception {
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

        Competition competition = new Competition(
                "Cup", "desc", "short", LocalDateTime.now(), LocalDateTime.now(),
                LocalDateTime.now(), "img", "Moscow", "Lenina 10", "Arena",
                BigDecimal.valueOf(2000), 20, 5, "18+", 18, 35,
                Competition.CompetitionStatus.OPEN, Competition.CompetitionFormat.SOLO, game, user
        );
        competition.setId(1);

        when(userService.getUser(1)).thenReturn(user);
        when(competitionService.getOneCompetition(1)).thenReturn(competition);
        doNothing().when(competitionApplicationService).createApplication(any(User.class), any(Competition.class));

        mockMvc.perform(post("/createCompetitionApplication")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "userId": "1",
                                  "competitionId": "1"
                                }
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void getCompetitionApplicationsByUser_shouldReturnList() throws Exception {
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
        Competition competition = new Competition(
                "Cup", "desc", "short", LocalDateTime.now(), LocalDateTime.now(),
                LocalDateTime.now(), "img", "Moscow", "Lenina 10", "Arena",
                BigDecimal.valueOf(2000), 20, 5, "18+", 18, 35,
                Competition.CompetitionStatus.OPEN, Competition.CompetitionFormat.SOLO, game, user
        );
        CompetitionApplication application = new CompetitionApplication(
                user, competition, LocalDateTime.now(),
                CompetitionApplication.ApplicationStatus.PENDING,
                CompetitionApplication.PaymentStatus.NOT_REQUIRED,
                null
        );
        application.setId(1);

        when(competitionApplicationService.getApplicationsByUserId(1)).thenReturn(List.of(application));

        mockMvc.perform(get("/getCompetitionApplicationsByUser/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    void updateCompetitionApplicationStatus_shouldReturnOk() throws Exception {
        doNothing().when(competitionApplicationService)
                .updateApplicationStatus(eq(1), eq(CompetitionApplication.ApplicationStatus.APPROVED));

        mockMvc.perform(patch("/updateCompetitionApplicationStatus/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "status": "APPROVED"
                                }
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void markCompetitionApplicationAsPaid_shouldReturnOk() throws Exception {
        doNothing().when(competitionApplicationService).markAsPaidByUser(1, "http://proof");

        mockMvc.perform(patch("/markCompetitionApplicationAsPaid/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "paymentProof": "http://proof"
                                }
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void updateCompetitionPaymentStatus_shouldReturnOk() throws Exception {
        doNothing().when(competitionApplicationService)
                .updatePaymentStatus(eq(1), eq(CompetitionApplication.PaymentStatus.PAID));

        mockMvc.perform(patch("/updateCompetitionPaymentStatus/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "paymentStatus": "PAID"
                                }
                                """))
                .andExpect(status().isOk());
    }
}