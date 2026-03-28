package ru.hse.efremov.competition_platform.service;

import org.hibernate.annotations.NotFound;
import org.springframework.stereotype.Service;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.UserRepository;

import java.time.LocalDateTime;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(String username, String email, LocalDateTime createdAt) {
        User user = new User(username, email, createdAt);
        userRepository.save(user);

    }

    public User getUser(Integer id){
        return userRepository.findById(id).orElseThrow();
    }
}
