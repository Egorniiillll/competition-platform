package ru.hse.efremov.competition_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.hse.efremov.competition_platform.entity.CompetitionApplication;

import java.util.List;

public interface CompetitionApplicationRepository extends JpaRepository<CompetitionApplication, Integer> {
    List<CompetitionApplication> findByUserId(Integer userId);
    List<CompetitionApplication> findByCompetitionId(Integer competitionId);
    List<CompetitionApplication> findByCompetitionOrganizerId(Integer organizerId);
}