package ru.hse.efremov.competition_platform.chat;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String senderName;
    @Column(columnDefinition = "TEXT")
    private String text;
    private LocalDateTime sentAt;
    public ChatMessage() {
    }

    public ChatMessage(String senderName, String text, LocalDateTime sentAt) {
        this.senderName = senderName;
        this.text = text;
        this.sentAt = sentAt;
    }
}