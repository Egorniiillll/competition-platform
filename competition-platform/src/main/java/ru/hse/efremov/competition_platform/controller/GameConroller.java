package ru.hse.efremov.competition_platform.controller;


import org.springframework.web.bind.annotation.*;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.service.GameService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
public class GameConroller {

    private final GameService gameService;

    public GameConroller(GameService gameService) {
        this.gameService = gameService;
    }


    @PostMapping("/createGame")
    public void createGame(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String description = body.get("description");
        String types = body.get("types");
        LocalDateTime createdAt = LocalDateTime.parse(body.get("createdAt"));
        gameService.createNewGame(name, description, types, createdAt);

    }

    @GetMapping("/getOneGame/{id}")
    public Game getOneGame(@PathVariable Integer id) {
        return gameService.getOneGame(id);
    }

    @GetMapping("/getAllGames")
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

}
