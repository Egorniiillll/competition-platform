package ru.hse.efremov.competition_platform.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.CompetitionRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CompetitionServiceTest {

    @Mock
    private CompetitionRepository competitionRepository;

    @InjectMocks
    private CompetitionService competitionService;

    private User organizer;
    private Game game;
    private Competition competition;

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
                organizer
        );
        competition.setId(1);
    }

    @Test
    void createNewCompetition_shouldSaveCompetition() {
        competitionService.createNewCompetition(
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
                organizer
        );

        verify(competitionRepository, times(1)).save(any(Competition.class));
    }

    @Test
    void getOneCompetition_shouldReturnCompetition() {
        when(competitionRepository.findById(1)).thenReturn(Optional.of(competition));

        Competition result = competitionService.getOneCompetition(1);

        assertEquals("Cup", result.getTitle());
        assertEquals("Moscow", result.getCity());
    }

    @Test
    void getAllCompetitions_shouldReturnAllCompetitions() {
        when(competitionRepository.findAll()).thenReturn(List.of(competition));

        List<Competition> result = competitionService.getAllCompetitions();

        assertEquals(1, result.size());
        assertEquals("Cup", result.get(0).getTitle());
    }

    @Test
    void getCompetitionsByOrganizer_shouldReturnCompetitionsOfOrganizer() {
        when(competitionRepository.findByOrganizerId(1)).thenReturn(List.of(competition));

        List<Competition> result = competitionService.getCompetitionsByOrganizer(1);

        assertEquals(1, result.size());
        assertEquals("Cup", result.get(0).getTitle());
    }
}