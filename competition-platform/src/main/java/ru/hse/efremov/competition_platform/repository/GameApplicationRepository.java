package ru.hse.efremov.competition_platform.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import ru.hse.efremov.competition_platform.entity.GameApplication;


import java.util.List;

public interface GameApplicationRepository extends JpaRepository<GameApplication, Integer> {

    List<GameApplication> findByUserId(Integer userId);
    List<GameApplication> findByGameId(Integer gameId);
    List<GameApplication> findByGameOrganizerId(Integer organizerId);

}