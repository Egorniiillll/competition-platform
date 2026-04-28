package ru.hse.efremov.competition_platform.service;

import org.springframework.stereotype.Controller;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.repository.GameRepository;

import java.time.LocalDateTime;
import java.util.List;

@Controller
public class GameService {
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public void createNewGame(String name, String description, String types, LocalDateTime createdAt) {
        Game game = new Game(name, description, types, createdAt);
        gameRepository.save(game);
    }

    public Game getOneGame(Integer id) {
        return gameRepository.findById(id).orElseThrow();
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }
    public Game createNewGameAndRev(String name, String description, String types, LocalDateTime createdAt) {
        Game game = new Game(name, description, types, createdAt);
        return gameRepository.save(game);
    }
}
