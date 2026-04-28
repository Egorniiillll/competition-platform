package ru.hse.efremov.competition_platform.controller;

import jakarta.persistence.Id;
import org.springframework.web.bind.annotation.*;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.repository.GameRepository;
import ru.hse.efremov.competition_platform.service.CompetitionService;
import ru.hse.efremov.competition_platform.service.GameService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CompetitionController {
    private final CompetitionService competitionService;
    private final GameService gameService;

    public CompetitionController(CompetitionService competitionService, GameService gameService) {
        this.competitionService = competitionService;
        this.gameService = gameService;
    }

    @PostMapping("/createCompetition")
    public void createCompetition(@RequestBody Map<String, String> body) {

        String title = body.get("title");
        String description = body.get("description");
        LocalDateTime startDate = LocalDateTime.parse(body.get("startDate"));
        LocalDateTime endDate = LocalDateTime.parse(body.get("endDate"));
        String location = body.get("location");
        String name = body.get("name");
        String descriptio = body.get("description");
        String types = body.get("types");
        LocalDateTime createdAt = LocalDateTime.parse(body.get("createdAt"));
        Game game = new Game(name, descriptio, types, createdAt);
        Game game1 = gameService.createNewGameAndRev(name, descriptio, types, createdAt);

        competitionService.createNewCompetition(title, description, location, startDate, endDate, game1);

    }

    @GetMapping("/getAllCompetitions")
    public List<Competition> getAllCompetition() {
        return competitionService.getAllCompetitions();
    }

    @GetMapping("/getOneCompetition/{id}")
    public Competition getOneCompetition(@PathVariable Integer id) {
        return competitionService.getOneCompetition(id);

    }


}
