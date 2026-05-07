package ru.hse.efremov.competition_platform.controller;

import org.springframework.web.bind.annotation.*;
import ru.hse.efremov.competition_platform.entity.GameApplication;
import ru.hse.efremov.competition_platform.entity.Game;

import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.service.GameApplicationService;
import ru.hse.efremov.competition_platform.service.GameService;
import ru.hse.efremov.competition_platform.service.UserService;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class GameApplicationController {
    private final GameApplicationService gameApplicationService;
    private final UserService userService;
    private final GameService gameService;

    public GameApplicationController(GameApplicationService gameApplicationService,
                                     UserService userService,
                                     GameService gameService) {
        this.gameApplicationService = gameApplicationService;
        this.userService = userService;
        this.gameService = gameService;
    }

    @PostMapping("/createGameApplication")
    public void createGameApplication(@RequestBody Map<String, String> body) {
        Integer userId = Integer.parseInt(body.get("userId"));
        Integer gameId = Integer.parseInt(body.get("gameId"));

        User user = userService.getUser(userId);
        Game game = gameService.getOneGame(gameId);

        gameApplicationService.createApplication(user, game);
    }

    @GetMapping("/getGameApplicationsByUser/{userId}")
    public List<GameApplication> getGameApplicationsByUser(@PathVariable Integer userId) {
        return gameApplicationService.getApplicationsByUserId(userId);
    }

    @GetMapping("/getGameApplicationsByGame/{gameId}")
    public List<GameApplication> getGameApplicationsByGame(@PathVariable Integer gameId) {
        return gameApplicationService.getApplicationsByGameId(gameId);
    }

    @GetMapping("/getGameApplicationsByOrganizer/{organizerId}")
    public List<GameApplication> getGameApplicationsByOrganizer(@PathVariable Integer organizerId) {
        return gameApplicationService.getApplicationsByOrganizerId(organizerId);
    }

    @PatchMapping("/updateGameApplicationStatus/{id}")
    public void updateGameApplicationStatus(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        GameApplication.ApplicationStatus status =  GameApplication.ApplicationStatus.valueOf(body.get("status"));
        gameApplicationService.updateApplicationStatus(id, status);
    }
}