package ru.hse.efremov.competition_platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.hse.efremov.competition_platform.chat.ChatMessage;

import java.util.List;
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    List<ChatMessage> findAllByOrderBySentAtAsc();
}