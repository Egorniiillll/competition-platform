package ru.hse.efremov.competition_platform.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User(
                User.Role.PARTICIPANT,
                "egor",
                "Egor",
                "Efremov",
                "Sergeevich",
                "egor@example.com",
                LocalDate.of(2004, 5, 17),
                LocalDateTime.now(),
                "+79991234567",
                User.Gender.MALE,
                "Moscow",
                182.5,
                74.3,
                "12345"
        );
        user.setId(1);
    }

    @Test
    void createUser_shouldSaveUser() {
        userService.createUser(
                User.Role.PARTICIPANT,
                "egor",
                "Egor",
                "Efremov",
                "Sergeevich",
                "egor@example.com",
                LocalDate.of(2004, 5, 17),
                LocalDateTime.now(),
                "+79991234567",
                User.Gender.MALE,
                "Moscow",
                182.5,
                74.3,
                "12345"
        );

        verify(userRepository, times(1)).save(argThat(savedUser ->
                savedUser.getUsername().equals("egor") &&
                        savedUser.getEmail().equals("egor@example.com") &&
                        savedUser.getRole() == User.Role.PARTICIPANT &&
                        savedUser.getPassword().equals("12345")
        ));
    }

    @Test
    void login_shouldReturnUser() {
        when(userRepository.findByEmailAndPassword("egor@example.com", "12345"))
                .thenReturn(Optional.of(user));

        User result = userService.login("egor@example.com", "12345");

        assertEquals("egor", result.getUsername());
        assertEquals("egor@example.com", result.getEmail());
    }

    @Test
    void getUser_shouldReturnUserById() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        User result = userService.getUser(1);

        assertEquals(1, result.getId());
        assertEquals("egor", result.getUsername());
    }

    @Test
    void getAllUser_shouldReturnAllUsers() {
        when(userRepository.findAll()).thenReturn(List.of(user));

        List<User> result = userService.getAllUser();

        assertEquals(1, result.size());
        assertEquals("egor", result.get(0).getUsername());
    }

    @Test
    void updateUser_shouldUpdateFields() {
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User updatedUser = userService.updateUser(
                1,
                "newEgor",
                "NewEgor",
                "NewEfremov",
                "NewThird",
                "new@example.com",
                LocalDate.of(2000, 1, 1),
                "+70000000000",
                User.Gender.MALE,
                "SPB",
                180.0,
                70.0
        );

        assertEquals("newEgor", updatedUser.getUsername());
        assertEquals("new@example.com", updatedUser.getEmail());
        assertEquals("SPB", updatedUser.getCity());
        assertEquals(180.0, updatedUser.getHeight());
        assertEquals(70.0, updatedUser.getWeight());
        verify(userRepository, times(1)).save(user);
    }
}