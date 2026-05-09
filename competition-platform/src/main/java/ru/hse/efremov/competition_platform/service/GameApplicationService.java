package ru.hse.efremov.competition_platform.service;

import org.springframework.stereotype.Service;
import ru.hse.efremov.competition_platform.entity.GameApplication;
import ru.hse.efremov.competition_platform.entity.Game;

import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.GameApplicationRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GameApplicationService {
    private final GameApplicationRepository gameApplicationRepository;

    public GameApplicationService(GameApplicationRepository gameApplicationRepository) {
        this.gameApplicationRepository = gameApplicationRepository;
    }

    public void createApplication(User user, Game game) {
        GameApplication gameApplication = new GameApplication(
                user,
                game,
                LocalDateTime.now(),
                GameApplication.ApplicationStatus.PENDING,
                GameApplication.PaymentStatus.NOT_REQUIRED,
                null
        );

        gameApplicationRepository.save(gameApplication);
    }

    public List<GameApplication> getApplicationsByUserId(Integer userId) {
        return gameApplicationRepository.findByUserId(userId);
    }

    public List<GameApplication> getApplicationsByGameId(Integer gameId) {
        return gameApplicationRepository.findByGameId(gameId);
    }

    public List<GameApplication> getApplicationsByOrganizerId(Integer organizerId) {
        return gameApplicationRepository.findByGameOrganizerId(organizerId);
    }

    public void updateApplicationStatus(Integer applicationId, GameApplication.ApplicationStatus status) {
        GameApplication application = gameApplicationRepository.findById(applicationId).orElseThrow();
        application.setStatus(status);
        if (status == GameApplication.ApplicationStatus.APPROVED) {
            application.setPaymentStatus(GameApplication.PaymentStatus.WAITING_FOR_PAYMENT);
        }
        if (status == GameApplication.ApplicationStatus.REJECTED) {
            application.setPaymentStatus(GameApplication.PaymentStatus.NOT_REQUIRED);
            application.setPaymentProof(null);
        }

        gameApplicationRepository.save(application);
    }
    public void markAsPaidByUser(Integer applicationId, String paymentProof) {
        GameApplication application = gameApplicationRepository.findById(applicationId).orElseThrow();
        application.setPaymentStatus(GameApplication.PaymentStatus.CHECKING);
        application.setPaymentProof(paymentProof);
        gameApplicationRepository.save(application);
    }

    public void updatePaymentStatus(Integer applicationId, GameApplication.PaymentStatus paymentStatus) {
        GameApplication application = gameApplicationRepository.findById(applicationId).orElseThrow();
        application.setPaymentStatus(paymentStatus);
        gameApplicationRepository.save(application);
    }

}