package ru.hse.efremov.competition_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.hse.efremov.competition_platform.entity.Competition;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition,Integer> {
}
