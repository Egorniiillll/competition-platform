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
                GameApplication.ApplicationStatus.PENDING
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
        gameApplicationRepository.save(application);
    }
}