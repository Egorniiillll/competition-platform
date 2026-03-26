package ru.hse.efremov.competition_platform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import ru.hse.efremov.competition_platform.service.UserService;

import java.time.LocalDateTime;

@Controller
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("user/")
    public void createUser(@RequestBody String username, String email, LocalDateTime createdAt) {
        userService.createUser(username, email, createdAt);
    }
}
