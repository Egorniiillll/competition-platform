package ru.hse.efremov.competition_platform.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import ru.hse.efremov.competition_platform.entity.User;
import ru.hse.efremov.competition_platform.service.UserService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @Test
    void getUser_shouldReturnUser() throws Exception {
        User user = new User(
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

        when(userService.getUser(1)).thenReturn(user);

        mockMvc.perform(get("/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.username").value("egor"));
    }

    @Test
    void getAllUser_shouldReturnList() throws Exception {
        User user = new User(
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

        when(userService.getAllUser()).thenReturn(List.of(user));

        mockMvc.perform(get("/userAll"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].username").value("egor"));
    }

    @Test
    void login_shouldReturnUser() throws Exception {
        User user = new User(
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

        when(userService.login("egor@example.com", "12345")).thenReturn(user);

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "email": "egor@example.com",
                                  "password": "12345"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value("egor@example.com"));
    }

    @Test
    void createUser_shouldReturnOk() throws Exception {
        doNothing().when(userService).createUser(
                any(), anyString(), anyString(), anyString(), anyString(), anyString(),
                any(), any(), anyString(), any(), anyString(), anyDouble(), anyDouble(), anyString()
        );

        mockMvc.perform(post("/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "egor",
                                  "firstName": "Egor",
                                  "secondName": "Efremov",
                                  "thirdName": "Sergeevich",
                                  "password": "12345",
                                  "email": "egor@example.com",
                                  "birthdayDate": "2004-05-17",
                                  "dateOfRegistration": "2026-05-18T12:00:00",
                                  "personalPhone": "+79991234567",
                                  "gender": "MALE",
                                  "city": "Moscow",
                                  "role": "PARTICIPANT",
                                  "height": "182.5",
                                  "weight": "74.3"
                                }
                                """))
                .andExpect(status().isOk());
    }

    @Test
    void updateUser_shouldReturnUpdatedUser() throws Exception {
        User updatedUser = new User(
                User.Role.PARTICIPANT,
                "newEgor",
                "NewEgor",
                "Efremov",
                "Sergeevich",
                "new@example.com",
                LocalDate.of(2004, 5, 17),
                LocalDateTime.now(),
                "+79991234567",
                User.Gender.MALE,
                "SPB",
                180.0,
                70.0,
                "12345"
        );
        updatedUser.setId(1);

        when(userService.updateUser(
                eq(1), anyString(), anyString(), anyString(), anyString(),
                anyString(), any(), anyString(), any(), anyString(), anyDouble(), anyDouble()
        )).thenReturn(updatedUser);

        mockMvc.perform(patch("/user/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "newEgor",
                                  "firstName": "NewEgor",
                                  "secondName": "Efremov",
                                  "thirdName": "Sergeevich",
                                  "email": "new@example.com",
                                  "birthdayDate": "2004-05-17",
                                  "personalPhone": "+79991234567",
                                  "gender": "MALE",
                                  "city": "SPB",
                                  "height": "180.0",
                                  "weight": "70.0"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("newEgor"))
                .andExpect(jsonPath("$.city").value("SPB"));
    }
}