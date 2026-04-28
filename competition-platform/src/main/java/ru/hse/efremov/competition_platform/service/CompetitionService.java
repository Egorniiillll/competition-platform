package ru.hse.efremov.competition_platform.service;

import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.repository.CompetitionRepository;
import ru.hse.efremov.competition_platform.repository.GameRepository;

import java.time.LocalDateTime;
import java.util.List;



@Service
public class CompetitionService {
    private final CompetitionRepository competitionRepository;


    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }


    public void createNewCompetition(String title, String description, String location, LocalDateTime startDate, LocalDateTime endDate, Game game) {

        Competition competition = new Competition(title, description, startDate, endDate, location,game);
        competitionRepository.save(competition);
    }


    public Competition getOneCompetition(Integer id) {
        return competitionRepository.findById(id).orElseThrow();
    }

    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }
}

