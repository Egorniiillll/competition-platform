package ru.hse.efremov.competition_platform.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.service.CompetitionService;
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

@WebMvcTest(CompetitionController.class)
class CompetitionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CompetitionService competitionService;

    @MockitoBean
    private GameService gameService;

    @MockitoBean
    private UserService userService;

    @Test
    void getOneCompetition_shouldReturnCompetition() throws Exception {
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

        Competition competition = new Competition(
                "Cup", "desc", "short", LocalDateTime.now(), LocalDateTime.now(),
                LocalDateTime.now(), "img", "Moscow", "Lenina 10", "Arena",
                BigDecimal.valueOf(2000), 20, 5, "18+", 18, 35,
                Competition.CompetitionStatus.OPEN, Competition.CompetitionFormat.SOLO, game, organizer
        );
        competition.setId(1);

        when(competitionService.getOneCompetition(1)).thenReturn(competition);

        mockMvc.perform(get("/getOneCompetition/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Cup"));
    }

    @Test
    void getAllCompetitions_shouldReturnList() throws Exception {
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

        Competition competition = new Competition(
                "Cup", "desc", "short", LocalDateTime.now(), LocalDateTime.now(),
                LocalDateTime.now(), "img", "Moscow", "Lenina 10", "Arena",
                BigDecimal.valueOf(2000), 20, 5, "18+", 18, 35,
                Competition.CompetitionStatus.OPEN, Competition.CompetitionFormat.SOLO, game, organizer
        );
        competition.setId(1);

        when(competitionService.getAllCompetitions()).thenReturn(List.of(competition));

        mockMvc.perform(get("/getAllCompetitions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Cup"));
    }

    @Test
    void getCompetitionsByOrganizer_shouldReturnList() throws Exception {
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

        Competition competition = new Competition(
                "Cup", "desc", "short", LocalDateTime.now(), LocalDateTime.now(),
                LocalDateTime.now(), "img", "Moscow", "Lenina 10", "Arena",
                BigDecimal.valueOf(2000), 20, 5, "18+", 18, 35,
                Competition.CompetitionStatus.OPEN, Competition.CompetitionFormat.SOLO, game, organizer
        );
        competition.setId(1);

        when(competitionService.getCompetitionsByOrganizer(1)).thenReturn(List.of(competition));

        mockMvc.perform(get("/getCompetitionsByOrganaizerId/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Cup"));
    }

    @Test
    void createCompetition_shouldReturnOk() throws Exception {
        User organizer = new User(
                User.Role.ORGANIZER, "egor", "Egor", "Efremov", "Sergeevich",
                "egor@example.com", LocalDate.of(2004, 5, 17), LocalDateTime.now(),
                "+79991234567", User.Gender.MALE, "Moscow", 182.5, 74.3, "12345"
        );
        organizer.setId(1);

        Game game = new Game(
                "Football", "desc", "req", "SPORT", LocalDateTime.now(),
                LocalDateTime.now(), LocalDateTime.now(), "img", "Moscow",
                "Lenina 10", BigDecimal.valueOf(1500), organizer
        );
        game.setId(1);

        when(userService.getUser(1)).thenReturn(organizer);
        when(gameService.getOneGame(1)).thenReturn(game);

        doNothing().when(competitionService).createNewCompetition(
                anyString(), anyString(), anyString(), any(), any(), any(),
                anyString(), anyString(), anyString(), anyString(), any(),
                anyInt(), anyInt(), anyString(), anyInt(), anyInt(),
                any(), any(), any(Game.class), any(User.class)
        );

        mockMvc.perform(post("/createCompetition")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Cup",
                                  "description": "desc",
                                  "shortDescription": "short",
                                  "startDate": "2026-05-18T12:00:00",
                                  "endDate": "2026-05-18T15:00:00",
                                  "imageURL": "img",
                                  "city": "Moscow",
                                  "address": "Lenina 10",
                                  "placeName": "Arena",
                                  "entryFee": "2000",
                                  "maxParticipants": "20",
                                  "currentParticipants": "5",
                                  "requirements": "18+",
                                  "minAge": "18",
                                  "maxAge": "35",
                                  "status": "OPEN",
                                  "format": "SOLO",
                                  "gameId": "1",
                                  "organizerId": "1"
                                }
                                """))
                .andExpect(status().isOk());
    }
}