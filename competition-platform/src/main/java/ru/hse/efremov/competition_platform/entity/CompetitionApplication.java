package ru.hse.efremov.competition_platform.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class CompetitionApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "competition_id")
    private Competition competition;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    public enum ApplicationStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    public CompetitionApplication(User user, Competition competition, LocalDateTime createdAt, ApplicationStatus status) {
        this.user = user;
        this.competition = competition;
        this.createdAt = createdAt;
        this.status = status;
    }

    public CompetitionApplication() {
    }
}