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
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    private String paymentProof;

    public enum ApplicationStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    public enum PaymentStatus {
        NOT_REQUIRED,
        WAITING_FOR_PAYMENT,
        CHECKING,
        PAID,
        REJECTED
    }

    public GameApplication(User user,
                           Game game,
                           LocalDateTime createdAt,
                           ApplicationStatus status,
                           PaymentStatus paymentStatus,
                           String paymentProof) {
        this.user = user;
        this.game = game;
        this.createdAt = createdAt;
        this.status = status;
        this.paymentStatus = paymentStatus;
        this.paymentProof = paymentProof;
    }
    public GameApplication() {
    }
}