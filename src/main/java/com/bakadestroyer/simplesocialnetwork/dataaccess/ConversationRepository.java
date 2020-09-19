package com.bakadestroyer.simplesocialnetwork.dataaccess;

import com.bakadestroyer.simplesocialnetwork.models.Conversation;
import com.bakadestroyer.simplesocialnetwork.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    @Query("select c from Conversation c where (c.userOne = ?1 or c.userTwo = ?1)")
    Page<Conversation> findAllByCurrentUser(User user, Pageable pageable);

    // FIXME: 16.09.2020 : i guess there should be better way to implement this so i have to fix it later
    @Query("select c from Conversation c where (c.userOne = ?1 and c.userTwo = ?2) or (c.userOne = ?2 and c.userTwo = ?1)")
    Conversation findConversationByParticipants(User userOne, User userTwo);
}
