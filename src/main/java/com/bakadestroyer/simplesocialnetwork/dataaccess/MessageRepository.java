package com.bakadestroyer.simplesocialnetwork.dataaccess;

import com.bakadestroyer.simplesocialnetwork.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
