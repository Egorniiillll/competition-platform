package ru.hse.efremov.competition_platform.controller;


import org.springframework.web.bind.annotation.*;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.service.UserService;

import java.time.LocalDateTime;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    public void createUser(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String email = body.get("email");
        LocalDateTime createdAt = LocalDateTime.parse(body.get("createdAt"));

        userService.createUser(username, email, createdAt);
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Integer id) {
        return userService.getUser(id);
    }
}
