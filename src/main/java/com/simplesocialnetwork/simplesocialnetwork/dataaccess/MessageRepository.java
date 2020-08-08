package com.simplesocialnetwork.simplesocialnetwork.dataaccess;

import com.simplesocialnetwork.simplesocialnetwork.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
