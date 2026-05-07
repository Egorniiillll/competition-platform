package ru.hse.efremov.competition_platform.service;

import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.CompetitionRepository;
import ru.hse.efremov.competition_platform.repository.GameRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;



@Service
public class CompetitionService {
    private final CompetitionRepository competitionRepository;


    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }


    public void createNewCompetition(String title, String description, String shortDescription,
                                     LocalDateTime createdAt, LocalDateTime startDate,
                                     LocalDateTime endDate, String imageURL, String city,
                                     String address, String placeName, BigDecimal entryFee,
                                     Integer maxParticipants, Integer currentParticipants,
                                     String requirements, Integer minAge, Integer maxAge,
                                     Competition.CompetitionStatus status, Competition.CompetitionFormat format,
                                     Game game, User organizer) {

        Competition competition = new Competition( title,  description,  shortDescription,
                 createdAt,  startDate,
                 endDate,  imageURL,  city,
                 address,  placeName,  entryFee,
                 maxParticipants,  currentParticipants,
                 requirements,  minAge,  maxAge,
                 status,  format,
                 game,  organizer);
        competitionRepository.save(competition);
    }


    public Competition getOneCompetition(Integer id) {
        return competitionRepository.findById(id).orElseThrow();
    }

    public List<Competition> getAllCompetitions() {
        return competitionRepository.findAll();
    }
}

