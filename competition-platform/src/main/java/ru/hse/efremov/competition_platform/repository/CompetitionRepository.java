package ru.hse.efremov.competition_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.Game;

import java.util.List;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition,Integer> {
    List<Competition> findByOrganizerId(Integer id);
}
