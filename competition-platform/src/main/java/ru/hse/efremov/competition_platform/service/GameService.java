package ru.hse.efremov.competition_platform.service;

import org.springframework.stereotype.Service;

import ru.hse.efremov.competition_platform.entity.Game;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.GameRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class GameService {
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public void createNewGame(String name, String description, String requirement, String types,
                              LocalDateTime createdAt, LocalDateTime startDate,
                              LocalDateTime endDate, String imageURL,
                              String city, String address, BigDecimal price, User organizer) {
        Game game = new Game(name, description, requirement,
                types, createdAt, startDate,
                endDate, imageURL, city,
                address, price, organizer);
        gameRepository.save(game);
    }

    public Game getOneGame(Integer id) {
        return gameRepository.findById(id).orElseThrow();
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public List<Game> getGamesByOrganizer(Integer id) {
        return gameRepository.findByOrganizerId(id);
    }

    public Game createNewGameAndRev(String name, String description, String requirement, String types,
                                    LocalDateTime createdAt, LocalDateTime startDate,
                                    LocalDateTime endDate, String imageURL,
                                    String city, String address, BigDecimal price,User organizer) {
        Game game = new Game(name, description, requirement,
                types, createdAt, startDate,
                endDate, imageURL, city,
                address, price, organizer);
        return gameRepository.save(game);
    }
}
