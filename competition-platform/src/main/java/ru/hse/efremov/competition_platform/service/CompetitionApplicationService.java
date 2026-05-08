package ru.hse.efremov.competition_platform.service;

import org.springframework.stereotype.Service;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.CompetitionApplication;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.CompetitionApplicationRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CompetitionApplicationService {
    private final CompetitionApplicationRepository competitionApplicationRepository;

    public CompetitionApplicationService(CompetitionApplicationRepository competitionApplicationRepository) {
        this.competitionApplicationRepository = competitionApplicationRepository;
    }

    public void createApplication(User user, Competition competition) {
        CompetitionApplication competitionApplication = new CompetitionApplication(
                user,
                competition,
                LocalDateTime.now(),
                CompetitionApplication.ApplicationStatus.PENDING
        );

        competitionApplicationRepository.save(competitionApplication);
    }

    public List<CompetitionApplication> getApplicationsByUserId(Integer userId) {
        return competitionApplicationRepository.findByUserId(userId);
    }

    public List<CompetitionApplication> getApplicationsByCompetitionId(Integer competitionId) {
        return competitionApplicationRepository.findByCompetitionId(competitionId);
    }
    public List<CompetitionApplication> getApplicationsByOrganizerId(Integer organizerId) {
        return competitionApplicationRepository.findByCompetitionOrganizerId(organizerId);
    }

    public void updateApplicationStatus(Integer applicationId, CompetitionApplication.ApplicationStatus status) {
        CompetitionApplication application = competitionApplicationRepository.findById(applicationId).orElseThrow();
        application.setStatus(status);
        competitionApplicationRepository.save(application);
    }
}