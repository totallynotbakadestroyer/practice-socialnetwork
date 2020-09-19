package com.bakadestroyer.simplesocialnetwork.dataaccess;

import com.bakadestroyer.simplesocialnetwork.models.Conversation;
import com.bakadestroyer.simplesocialnetwork.models.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

    Page<Message> findAllByConversation(Conversation conversation, Pageable pageable);
}
