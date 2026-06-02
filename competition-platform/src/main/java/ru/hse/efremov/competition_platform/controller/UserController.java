package ru.hse.efremov.competition_platform.controller;


import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import ru.hse.efremov.competition_platform.dto.CreateUserRequest;
import ru.hse.efremov.competition_platform.dto.LoginRequest;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.service.UserService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    public void createUser(@Valid @RequestBody CreateUserRequest request) {
        LocalDateTime dateOfRegistration = request.getDateOfRegistration() != null
                ? request.getDateOfRegistration()
                : LocalDateTime.now();
        userService.createUser(
                User.Role.valueOf(request.getRole().trim().toUpperCase()),
                request.getUsername().trim(),
                request.getFirstName().trim(),
                request.getSecondName().trim(),
                request.getThirdName().trim(),
                request.getEmail().trim(),
                request.getBirthdayDate(),
                dateOfRegistration,
                request.getPersonalPhone().trim(),
                User.Gender.valueOf(request.getGender().trim().toUpperCase()),
                request.getCity().trim(),
                Double.parseDouble(request.getHeight()),
                Double.parseDouble(request.getWeight()),
                request.getPassword()
        );
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Integer id) {
        return userService.getUser(id);
    }

    @GetMapping("/userAll")
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

    @PatchMapping("/user/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        return userService.updateUser(
                id,
                body.get("username"),
                body.get("firstName"),
                body.get("secondName"),
                body.get("thirdName"),
                body.get("email"),
                LocalDate.parse(body.get("birthdayDate")),
                body.get("personalPhone"),
                User.Gender.valueOf(body.get("gender").trim().toUpperCase()),
                body.get("city"),
                Double.parseDouble(body.get("height")),
                Double.parseDouble(body.get("weight"))
        );
    }

    @PostMapping("/login")
    public User login(@Valid @RequestBody LoginRequest request) {
        return userService.login(request.resolveIdentifier(), request.getPassword());
    }
}
