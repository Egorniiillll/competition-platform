package ru.hse.efremov.competition_platform.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import ru.hse.efremov.competition_platform.dto.CreateGameApplicationRequest;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.GameApplication;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.service.GameApplicationService;
import ru.hse.efremov.competition_platform.service.GameService;
import ru.hse.efremov.competition_platform.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
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
    public void createGameApplication(@Valid @RequestBody CreateGameApplicationRequest request) {
        User user = userService.getUser(request.getUserId());
        Game game = gameService.getOneGame(request.getGameId());
        gameApplicationService.createApplication(user, game);
    }

    @GetMapping("/getGameApplicationsByUser/{userId}")
    public List<GameApplication> getGameApplicationsByUser(@PathVariable Integer userId) {
        return gameApplicationService.getApplicationsByUserId(userId);
    }

    @GetMapping("/getGameApplicationsByOrganizer/{organizerId}")
    public List<GameApplication> getGameApplicationsByOrganizer(@PathVariable Integer organizerId) {
        return gameApplicationService.getApplicationsByOrganizerId(organizerId);
    }

    @PatchMapping("/updateGameApplicationStatus/{id}")
    public void updateGameApplicationStatus(@PathVariable Integer id,
                                            @RequestBody Map<String, String> body) {
        GameApplication.ApplicationStatus status = GameApplication.ApplicationStatus.valueOf(body.get("status").trim().toUpperCase());
        gameApplicationService.updateApplicationStatus(id, status);
    }

    @PatchMapping("/markGameApplicationAsPaid/{id}")
    public void markGameApplicationAsPaid(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        gameApplicationService.markAsPaidByUser(id, body.get("paymentProof"));
    }

    @PatchMapping("/updateGamePaymentStatus/{id}")
    public void updateGamePaymentStatus(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        GameApplication.PaymentStatus paymentStatus =
                GameApplication.PaymentStatus.valueOf(body.get("paymentStatus").trim().toUpperCase());
        gameApplicationService.updatePaymentStatus(id, paymentStatus);
    }
}
