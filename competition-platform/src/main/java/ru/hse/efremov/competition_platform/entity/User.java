package ru.hse.efremov.competition_platform.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String email;
    private LocalDateTime createdAt;

    public User() {
    }


    public User( String username, String email, LocalDateTime createdAt) {
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
    }
}
