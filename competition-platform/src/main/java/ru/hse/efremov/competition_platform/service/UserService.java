package ru.hse.efremov.competition_platform.service;



import org.springframework.stereotype.Service;

import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.UserRepository;



import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(User.Role role, String username, String firstName, String secondName,
                           String thirdName, String email, LocalDate birthdayDate,
                           LocalDateTime dateOfRegistration, String personalPhone,
                           User.Gender gender, String city, double height, double weight) {
        User user = new User(role, username, firstName, secondName,
                thirdName, email, birthdayDate,
                dateOfRegistration, personalPhone,
                gender, city, height, weight);
        userRepository.save(user);

    }

    public User getUser(Integer id) {
        return userRepository.findById(id).orElseThrow();
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }
    public User updateUser(Integer id,
                           String username,
                           String firstName,
                           String secondName,
                           String thirdName,
                           String email,
                           LocalDate birthdayDate,
                           String personalPhone,
                           User.Gender gender,
                           String city,
                           double height,
                           double weight) {
        User user = userRepository.findById(id).orElseThrow();
        user.setUsername(username);
        user.setFirstName(firstName);
        user.setSecondName(secondName);
        user.setThirdName(thirdName);
        user.setEmail(email);
        user.setBirthdayDate(birthdayDate);
        user.setPersonalPhone(personalPhone);
        user.setGender(gender);
        user.setCity(city);
        user.setHeight(height);
        user.setWeight(weight);
        return userRepository.save(user);
    }
}
