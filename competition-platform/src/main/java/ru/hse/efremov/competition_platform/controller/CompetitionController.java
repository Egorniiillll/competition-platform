package ru.hse.efremov.competition_platform.controller;

import org.springframework.web.bind.annotation.*;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.service.CompetitionService;
import ru.hse.efremov.competition_platform.service.GameService;
import ru.hse.efremov.competition_platform.service.UserService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CompetitionController {
    private final CompetitionService competitionService;
    private final GameService gameService;
    private final UserService userService;

    public CompetitionController(CompetitionService competitionService,
                                 GameService gameService,
                                 UserService userService) {
        this.competitionService = competitionService;
        this.gameService = gameService;
        this.userService = userService;
    }

    @PostMapping("/createCompetition")
    public void createCompetition(@RequestBody Map<String, String> body) {
        String title = body.get("title");
        String description = body.get("description");
        String shortDescription = body.get("shortDescription");

        LocalDateTime createdAt = LocalDateTime.now();
        LocalDateTime startDate = LocalDateTime.parse(body.get("startDate"));
        LocalDateTime endDate = LocalDateTime.parse(body.get("endDate"));

        String imageURL = body.get("imageURL");

        String city = body.get("city");
        String address = body.get("address");
        String placeName = body.get("placeName");

        BigDecimal entryFee = new BigDecimal(body.get("entryFee"));

        Integer maxParticipants = Integer.parseInt(body.get("maxParticipants"));
        Integer currentParticipants = Integer.parseInt(body.get("currentParticipants"));

        String requirements = body.get("requirements");
        Integer minAge = Integer.parseInt(body.get("minAge"));
        Integer maxAge = Integer.parseInt(body.get("maxAge"));

        Competition.CompetitionStatus status =
                Competition.CompetitionStatus.valueOf(body.get("status").trim().toUpperCase());

        Competition.CompetitionFormat format =
                Competition.CompetitionFormat.valueOf(body.get("format").trim().toUpperCase());

        Integer gameId = Integer.parseInt(body.get("gameId"));
        Integer organizerId = Integer.parseInt(body.get("organizerId"));

        Game game = gameService.getOneGame(gameId);
        User organizer = userService.getUser(organizerId);

        competitionService.createNewCompetition(
                title,
                description,
                shortDescription,
                createdAt,
                startDate,
                endDate,
                imageURL,
                city,
                address,
                placeName,
                entryFee,
                maxParticipants,
                currentParticipants,
                requirements,
                minAge,
                maxAge,
                status,
                format,
                game,
                organizer
        );
    }

    @GetMapping("/getAllCompetitions")
    public List<Competition> getAllCompetition() {
        return competitionService.getAllCompetitions();
    }

    @GetMapping("/getOneCompetition/{id}")
    public Competition getOneCompetition(@PathVariable Integer id) {
        return competitionService.getOneCompetition(id);
    }

    @GetMapping("/getCompetitionsByOrganaizerId/{id}")
    public List<Competition> getCompetitionsByOrganaizerId(@PathVariable Integer id) {
        return competitionService.getCompetitionsByOrganizer(id);
    }
}