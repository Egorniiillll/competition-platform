package ru.hse.efremov.competition_platform.service;

import org.springframework.stereotype.Service;
import ru.hse.efremov.competition_platform.chat.ChatMessage;
import ru.hse.efremov.competition_platform.repository.ChatMessageRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }
    public ChatMessage saveMessage(String senderName, String text) {
        ChatMessage message = new ChatMessage(
                senderName,
                text,
                LocalDateTime.now()
        );
        return chatMessageRepository.save(message);
    }
    public List<ChatMessage> getAllMessages() {
        return chatMessageRepository.findAllByOrderBySentAtAsc();
    }
}