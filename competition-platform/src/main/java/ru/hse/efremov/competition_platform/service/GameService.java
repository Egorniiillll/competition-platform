package ru.hse.efremov.competition_platform.service;

import org.springframework.stereotype.Controller;
import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.repository.GameRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Controller
public class GameService {
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public void createNewGame(String name, String description, String types,
                              LocalDateTime createdAt, LocalDateTime startDate,
                              LocalDateTime endDate, String imageURL,
                              String city, String address, BigDecimal price) {
        Game game = new Game(name, description,
                types, createdAt, startDate,
                endDate, imageURL, city,
                address, price);
        gameRepository.save(game);
    }

    public Game getOneGame(Integer id) {
        return gameRepository.findById(id).orElseThrow();
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game createNewGameAndRev(String name, String description, String types,
                                    LocalDateTime createdAt, LocalDateTime startDate,
                                    LocalDateTime endDate, String imageURL,
                                    String city, String address, BigDecimal price) {
        Game game = new Game(name, description,
                types, createdAt, startDate,
                endDate, imageURL, city,
                address, price);
        return gameRepository.save(game);
    }
}
