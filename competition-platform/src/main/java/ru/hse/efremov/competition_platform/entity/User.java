package ru.hse.efremov.competition_platform.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String username;
    private String firstName;
    private String secondName;
    private String thirdName;
    private String email;
    private LocalDate birthdayDate;
    private LocalDateTime dateOfRegistration;
    private String personalPhone;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String city;
    private double height;
    private double weight;
    @JsonIgnore
    @Column(name = "user_password")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    public User() {
    }

    public enum Gender {
        MALE,
        FEMALE
    }
    public enum Role {
        PARTICIPANT,
        ORGANIZER
    }

    public User(Role role, String username, String firstName, String secondName,
                String thirdName, String email, LocalDate birthdayDate,
                LocalDateTime dateOfRegistration, String personalPhone,
                Gender gender, String city, double height, double weight, String password) {
        this.username = username;
        this.firstName = firstName;
        this.secondName = secondName;
        this.thirdName = thirdName;
        this.email = email;
        this.birthdayDate = birthdayDate;
        this.dateOfRegistration = dateOfRegistration;
        this.personalPhone = personalPhone;
        this.gender = gender;
        this.city = city;
        this.height = height;
        this.weight = weight;
        this.role = role;
        this.password = password;
    }
}
