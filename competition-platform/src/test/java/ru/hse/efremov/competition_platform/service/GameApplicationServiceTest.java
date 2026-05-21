package ru.hse.efremov.competition_platform.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.GameApplication;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.GameApplicationRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GameApplicationServiceTest {
    @Mock
    private GameApplicationRepository gameApplicationRepository;
    @InjectMocks
    private GameApplicationService gameApplicationService;
    private User user;
    private Game game;
    private GameApplication application;
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
                java.math.BigDecimal.valueOf(1500),
                user
        );

        application = new GameApplication(
                user,
                game,
                LocalDateTime.now(),
                GameApplication.ApplicationStatus.PENDING,
                GameApplication.PaymentStatus.NOT_REQUIRED,
                null
        );
        application.setId(1);
    }

    @Test
    void createApplication_shouldSaveApplicationWithPendingStatus() {
        gameApplicationService.createApplication(user, game);
        verify(gameApplicationRepository, times(1)).save(argThat(savedApplication ->
                savedApplication.getUser().equals(user) &&
                        savedApplication.getGame().equals(game) &&
                        savedApplication.getStatus() == GameApplication.ApplicationStatus.PENDING &&
                        savedApplication.getPaymentStatus() == GameApplication.PaymentStatus.NOT_REQUIRED &&
                        savedApplication.getPaymentProof() == null
        ));
    }

    @Test
    void updateApplicationStatus_shouldSetWaitingForPaymentWhenApproved() {
        when(gameApplicationRepository.findById(1)).thenReturn(Optional.of(application));
        gameApplicationService.updateApplicationStatus(1, GameApplication.ApplicationStatus.APPROVED);
        assertEquals(GameApplication.ApplicationStatus.APPROVED, application.getStatus());
        assertEquals(GameApplication.PaymentStatus.WAITING_FOR_PAYMENT, application.getPaymentStatus());
        verify(gameApplicationRepository, times(1)).save(application);
    }

    @Test
    void updateApplicationStatus_shouldSetNotRequiredAndClearProofWhenRejected() {
        application.setPaymentProof("http://proof");
        application.setPaymentStatus(GameApplication.PaymentStatus.CHECKING);
        when(gameApplicationRepository.findById(1)).thenReturn(Optional.of(application));
        gameApplicationService.updateApplicationStatus(1, GameApplication.ApplicationStatus.REJECTED);
        assertEquals(GameApplication.ApplicationStatus.REJECTED, application.getStatus());
        assertEquals(GameApplication.PaymentStatus.NOT_REQUIRED, application.getPaymentStatus());
        assertNull(application.getPaymentProof());
        verify(gameApplicationRepository, times(1)).save(application);
    }

    @Test
    void markAsPaidByUser_shouldSetCheckingStatusAndSaveProof() {
        when(gameApplicationRepository.findById(1)).thenReturn(Optional.of(application));
        gameApplicationService.markAsPaidByUser(1, "http://payment-proof");
        assertEquals(GameApplication.PaymentStatus.CHECKING, application.getPaymentStatus());
        assertEquals("http://payment-proof", application.getPaymentProof());
        verify(gameApplicationRepository, times(1)).save(application);
    }

    @Test
    void updatePaymentStatus_shouldUpdatePaymentStatus() {
        when(gameApplicationRepository.findById(1)).thenReturn(Optional.of(application));
        gameApplicationService.updatePaymentStatus(1, GameApplication.PaymentStatus.PAID);
        assertEquals(GameApplication.PaymentStatus.PAID, application.getPaymentStatus());
        verify(gameApplicationRepository, times(1)).save(application);
    }
}