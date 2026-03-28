package ru.hse.efremov.competition_platform.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private String types;
    private LocalDateTime createdAt;

    public Game(String name, String description, String types, LocalDateTime createdAt) {
        this.name = name;
        this.description = description;
        this.types = types;
        this.createdAt = createdAt;
    }

    public Game() {
    }
}
