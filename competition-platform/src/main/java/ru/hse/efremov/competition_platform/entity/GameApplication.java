package ru.hse.efremov.competition_platform.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class GameApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    public enum ApplicationStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    public GameApplication(User user, Game game, LocalDateTime createdAt, ApplicationStatus status) {
        this.user = user;
        this.game = game;
        this.createdAt = createdAt;
        this.status = status;
    }

    public GameApplication() {
    }
}