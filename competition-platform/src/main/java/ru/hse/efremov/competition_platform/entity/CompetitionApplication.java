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
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    private String paymentProof;

    public enum ApplicationStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    public CompetitionApplication(User user, Competition competition, LocalDateTime createdAt, ApplicationStatus status,PaymentStatus paymentStatus,String paymentProof) {
        this.user = user;
        this.competition = competition;
        this.createdAt = createdAt;
        this.status = status;
        this.paymentStatus = paymentStatus;
        this.paymentProof = paymentProof;
    }

    public CompetitionApplication() {
    }

    public enum PaymentStatus {
        NOT_REQUIRED,
        WAITING_FOR_PAYMENT,
        CHECKING,
        PAID,
        REJECTED
    }


}