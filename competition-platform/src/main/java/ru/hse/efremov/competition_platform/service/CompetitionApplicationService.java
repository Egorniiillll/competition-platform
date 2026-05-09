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
                CompetitionApplication.ApplicationStatus.PENDING,
                CompetitionApplication.PaymentStatus.NOT_REQUIRED,
                null
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
        if (status == CompetitionApplication.ApplicationStatus.APPROVED) {
            application.setPaymentStatus(CompetitionApplication.PaymentStatus.WAITING_FOR_PAYMENT);
        }
        if (status == CompetitionApplication.ApplicationStatus.REJECTED) {
            application.setPaymentStatus(CompetitionApplication.PaymentStatus.NOT_REQUIRED);
        }
        competitionApplicationRepository.save(application);
    }

    public void markAsPaidByUser(Integer applicationId, String paymentProof) {
        CompetitionApplication application = competitionApplicationRepository.findById(applicationId).orElseThrow();
        application.setPaymentStatus(CompetitionApplication.PaymentStatus.CHECKING);
        application.setPaymentProof(paymentProof);
        competitionApplicationRepository.save(application);
    }

    public void updatePaymentStatus(Integer applicationId, CompetitionApplication.PaymentStatus paymentStatus) {
        CompetitionApplication application = competitionApplicationRepository.findById(applicationId).orElseThrow();
        application.setPaymentStatus(paymentStatus);
        competitionApplicationRepository.save(application);
    }
}