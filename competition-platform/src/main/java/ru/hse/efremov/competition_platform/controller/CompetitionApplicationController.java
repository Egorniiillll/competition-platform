package ru.hse.efremov.competition_platform.controller;

import org.springframework.web.bind.annotation.*;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.CompetitionApplication;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.service.CompetitionApplicationService;
import ru.hse.efremov.competition_platform.service.CompetitionService;
import ru.hse.efremov.competition_platform.service.UserService;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CompetitionApplicationController {
    private final CompetitionApplicationService competitionApplicationService;
    private final UserService userService;
    private final CompetitionService competitionService;

    public CompetitionApplicationController(CompetitionApplicationService competitionApplicationService,
                                            UserService userService,
                                            CompetitionService competitionService) {
        this.competitionApplicationService = competitionApplicationService;
        this.userService = userService;
        this.competitionService = competitionService;
    }

    @PostMapping("/createCompetitionApplication")
    public void createCompetitionApplication(@RequestBody Map<String, String> body) {
        Integer userId = Integer.parseInt(body.get("userId"));
        Integer competitionId = Integer.parseInt(body.get("competitionId"));

        User user = userService.getUser(userId);
        Competition competition = competitionService.getOneCompetition(competitionId);

        competitionApplicationService.createApplication(user, competition);
    }

    @GetMapping("/getCompetitionApplicationsByUser/{userId}")
    public List<CompetitionApplication> getCompetitionApplicationsByUser(@PathVariable Integer userId) {
        return competitionApplicationService.getApplicationsByUserId(userId);
    }

    @GetMapping("/getCompetitionApplicationsByCompetition/{competitionId}")
    public List<CompetitionApplication> getCompetitionApplicationsByCompetition(@PathVariable Integer competitionId) {
        return competitionApplicationService.getApplicationsByCompetitionId(competitionId);
    }

    @GetMapping("/getCompetitionApplicationsByOrganizer/{organizerId}")
    public List<CompetitionApplication> getCompetitionApplicationsByOrganizer(@PathVariable Integer organizerId) {
        return competitionApplicationService.getApplicationsByOrganizerId(organizerId);
    }

    @PatchMapping("/updateCompetitionApplicationStatus/{id}")
    public void updateCompetitionApplicationStatus(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        CompetitionApplication.ApplicationStatus status = CompetitionApplication.ApplicationStatus.valueOf(body.get("status").trim().toUpperCase());
        competitionApplicationService.updateApplicationStatus(id, status);
    }
}