package ru.hse.efremov.competition_platform.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
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
    private String shortDescription;
    private String requirement;
    private String types;
    private LocalDateTime createdAt;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String imageURL;
    private String city;
    private String address;
    private BigDecimal price;
    @Enumerated(EnumType.STRING)
    private GameStatus status;
    private Integer maxParticipants;
    private Integer currentParticipants;
    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private  User organizer;

    public enum GameStatus {
        OPEN,
        CLOSED,
        FINISHED,
        CANCELLED
    }

    public Game(String name, String description, String requirement, String types,
                LocalDateTime createdAt, LocalDateTime startDate,
                LocalDateTime endDate, String imageURL,
                String city, String address, BigDecimal price,User organizer) {
        this.name = name;
        this.description = description;
        this.requirement= requirement;
        this.types = types;
        this.createdAt = createdAt;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imageURL = imageURL;
        this.city = city;
        this.address = address;
        this.price = price;
        this.organizer = organizer;
    }

    public Game() {
    }
}
