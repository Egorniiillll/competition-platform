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
    private String types;
    private LocalDateTime createdAt;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String imageURL;
    private String city;
    private String address;
    private BigDecimal price;

    public Game(String name, String description, String types,
                LocalDateTime createdAt, LocalDateTime startDate,
                LocalDateTime endDate, String imageURL,
                String city, String address, BigDecimal price) {
        this.name = name;
        this.description = description;
        this.types = types;
        this.createdAt = createdAt;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imageURL = imageURL;
        this.city = city;
        this.address = address;
        this.price = price;
    }

    public Game() {
    }
}
