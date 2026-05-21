package ru.hse.efremov.competition_platform.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.CompetitionApplication;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.CompetitionApplicationRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CompetitionApplicationServiceTest {
    @Mock
    private CompetitionApplicationRepository competitionApplicationRepository;
    @InjectMocks
    private CompetitionApplicationService competitionApplicationService;
    private User user;
    private Game game;
    private Competition competition;
    private CompetitionApplication application;

    @BeforeEach
    void setUp() {
        user = new User(
                User.Role.PARTICIPANT,
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

        application = new CompetitionApplication(
                user,
                competition,
                LocalDateTime.now(),
                CompetitionApplication.ApplicationStatus.PENDING,
                CompetitionApplication.PaymentStatus.NOT_REQUIRED,
                null
        );
        application.setId(1);
    }

    @Test
    void createApplication_shouldSaveApplicationWithPendingStatus() {
        competitionApplicationService.createApplication(user, competition);
        verify(competitionApplicationRepository, times(1)).save(argThat(savedApplication ->
                savedApplication.getUser().equals(user) &&
                        savedApplication.getCompetition().equals(competition) &&
                        savedApplication.getStatus() == CompetitionApplication.ApplicationStatus.PENDING &&
                        savedApplication.getPaymentStatus() == CompetitionApplication.PaymentStatus.NOT_REQUIRED &&
                        savedApplication.getPaymentProof() == null
        ));
    }

    @Test
    void updateApplicationStatus_shouldSetWaitingForPaymentWhenApproved() {
        when(competitionApplicationRepository.findById(1)).thenReturn(Optional.of(application));
        competitionApplicationService.updateApplicationStatus(1, CompetitionApplication.ApplicationStatus.APPROVED);
        assertEquals(CompetitionApplication.ApplicationStatus.APPROVED, application.getStatus());
        assertEquals(CompetitionApplication.PaymentStatus.WAITING_FOR_PAYMENT, application.getPaymentStatus());
        verify(competitionApplicationRepository, times(1)).save(application);
    }

    @Test
    void updateApplicationStatus_shouldSetNotRequiredWhenRejected() {
        when(competitionApplicationRepository.findById(1)).thenReturn(Optional.of(application));
        competitionApplicationService.updateApplicationStatus(1, CompetitionApplication.ApplicationStatus.REJECTED);
        assertEquals(CompetitionApplication.ApplicationStatus.REJECTED, application.getStatus());
        assertEquals(CompetitionApplication.PaymentStatus.NOT_REQUIRED, application.getPaymentStatus());
        verify(competitionApplicationRepository, times(1)).save(application);
    }

    @Test
    void markAsPaidByUser_shouldSetCheckingStatusAndSaveProof() {
        when(competitionApplicationRepository.findById(1)).thenReturn(Optional.of(application));
        competitionApplicationService.markAsPaidByUser(1, "http://payment-proof");
        assertEquals(CompetitionApplication.PaymentStatus.CHECKING, application.getPaymentStatus());
        assertEquals("http://payment-proof", application.getPaymentProof());
        verify(competitionApplicationRepository, times(1)).save(application);
    }

    @Test
    void updatePaymentStatus_shouldUpdatePaymentStatus() {
        when(competitionApplicationRepository.findById(1)).thenReturn(Optional.of(application));
        competitionApplicationService.updatePaymentStatus(1, CompetitionApplication.PaymentStatus.PAID);
        assertEquals(CompetitionApplication.PaymentStatus.PAID, application.getPaymentStatus());
        verify(competitionApplicationRepository, times(1)).save(application);
    }
}