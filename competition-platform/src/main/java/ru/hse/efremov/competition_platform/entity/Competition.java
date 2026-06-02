package ru.hse.efremov.competition_platform.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
public class Competition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    @Column(length = 1000)
    private String description;
    @Column(length = 1000)
    private String shortDescription;
    private LocalDateTime createdAt;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String imageURL;
    private String city;
    private String address;
    private String placeName;
    private BigDecimal entryFee;
    private Integer maxParticipants;
    private Integer currentParticipants;
    private String requirements;
    private Integer minAge;
    private Integer maxAge;
    @Enumerated(EnumType.STRING)
    private CompetitionStatus status;
    @Enumerated(EnumType.STRING)
    private CompetitionFormat format;
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;
    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private User organizer;

    public enum CompetitionStatus {
        DRAFT,
        OPEN,
        CLOSED,
        FINISHED,
        CANCELLED
    }

    public enum CompetitionFormat {
        SOLO,
        TEAM
    }

    public Competition(String title, String description, String shortDescription,
                       LocalDateTime createdAt, LocalDateTime startDate,
                       LocalDateTime endDate, String imageURL, String city,
                       String address, String placeName, BigDecimal entryFee,
                       Integer maxParticipants, Integer currentParticipants,
                       String requirements, Integer minAge, Integer maxAge,
                       CompetitionStatus status, CompetitionFormat format,
                       Game game, User organizer) {
        this.title = title;
        this.description = description;
        this.shortDescription = shortDescription;
        this.createdAt = createdAt;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imageURL = imageURL;
        this.city = city;
        this.address = address;
        this.placeName = placeName;
        this.entryFee = entryFee;
        this.maxParticipants = maxParticipants;
        this.currentParticipants = currentParticipants;
        this.requirements = requirements;
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.status = status;
        this.format = format;
        this.game = game;
        this.organizer = organizer;
    }

    public Competition() {

    }
}
