package ru.hse.efremov.competition_platform.chat;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.hse.efremov.competition_platform.entity.Competition;
import ru.hse.efremov.competition_platform.entity.Game;

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
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;
    @ManyToOne
    @JoinColumn(name = "competition_id")
    private Competition competition;
    public ChatMessage() {
    }

    public ChatMessage(String senderName, String text, LocalDateTime sentAt, Game game, Competition competition) {
        this.senderName = senderName;
        this.text = text;
        this.sentAt = sentAt;
        this.game = game;
        this.competition = competition;
    }
}