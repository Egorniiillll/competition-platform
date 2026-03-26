package ru.hse.efremov.competition_platform.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Competition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String location;
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;
}
