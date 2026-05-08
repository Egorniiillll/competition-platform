package ru.hse.efremov.competition_platform.controller;


import org.springframework.web.bind.annotation.*;
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
    public void createUser(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String firstName = body.get("firstName");
        String secondName = body.get("secondName");
        String thirdName = body.get("thirdName");
        String email = body.get("email");
        LocalDate birthdayDate = LocalDate.parse(body.get("birthdayDate"));
        LocalDateTime dateOfRegistration = LocalDateTime.parse(body.get("dateOfRegistration"));
        String personalPhone = body.get("personalPhone");
        User.Gender gender = User.Gender.valueOf(body.get("gender"));
        String city = body.get("city");
        User.Role role = User.Role.valueOf(body.get("role"));
        double height = Double.parseDouble(body.get("height"));
        double weight = Double.parseDouble(body.get("weight"));


        userService.createUser(role, username, firstName, secondName,
                thirdName, email, birthdayDate,
                dateOfRegistration, personalPhone,
                gender, city, height, weight);
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

    public User updateUser(@PathVariable Integer id,

                           @RequestBody Map<String, String> body) {

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
}
