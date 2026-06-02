package ru.hse.efremov.competition_platform.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import ru.hse.efremov.competition_platform.dto.CreateGameRequest;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.service.GameService;
import ru.hse.efremov.competition_platform.service.UserService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class GameConroller {
    private final GameService gameService;
    private final UserService userService;

    public GameConroller(GameService gameService, UserService userService) {
        this.gameService = gameService;
        this.userService = userService;
    }

    @PostMapping("/createGame")
    public void createGame(@Valid @RequestBody CreateGameRequest request) {
        User organizer = userService.getUser(request.getOrganizerId());
        gameService.createNewGame(
                request.getName(),
                request.getDescription(),
                request.getRequirement(),
                request.getTypes(),
                LocalDateTime.now(),
                request.getStartDate(),
                request.getEndDate(),
                request.getImageURL(),
                request.getCity(),
                request.getAddress(),
                new BigDecimal(request.getPrice()),
                organizer
        );
    }
    @GetMapping("/getOneGame/{id}")
    public Game getOneGame(@PathVariable Integer id) {
        return gameService.getOneGame(id);
    }

    @GetMapping("/getGamesByOrganaizerId/{id}")
    public List<Game> getGamesByOrganaizerId(@PathVariable Integer id) {
        return gameService.getGamesByOrganizer(id);
    }

    @GetMapping("/getAllGames")
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

}
