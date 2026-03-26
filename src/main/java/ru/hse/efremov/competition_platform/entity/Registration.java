package ru.hse.efremov.competition_platform.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Registration {
    @Id
    private Integer id;
    private String user;
    private String competition;
    private LocalDateTime registeredAt;
    private String status;
}
