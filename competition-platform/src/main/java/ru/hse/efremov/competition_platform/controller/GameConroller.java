package ru.hse.efremov.competition_platform.controller;


import org.springframework.web.bind.annotation.*;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.service.GameService;
import ru.hse.efremov.competition_platform.service.UserService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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
    public void createGame(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String description = body.get("description");
        String requirement = body.get("requirement");
        String types = body.get("types");
        LocalDateTime createdAt = LocalDateTime.parse(body.get("createdAt"));
        LocalDateTime startDate = LocalDateTime.parse(body.get("startDate"));
        LocalDateTime endDate = LocalDateTime.parse(body.get("endDate"));
        String imageURL = body.get("imageURL");
        String city = body.get("city");
        String address = body.get("address");
        BigDecimal price = new BigDecimal(body.get("price"));
        Integer organizerId = Integer.parseInt(body.get("organizerId"));
        User organizer = userService.getUser(organizerId);

        gameService.createNewGame(name, description, requirement,
                types, createdAt, startDate,
                endDate, imageURL, city,
                address, price, organizer);

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
