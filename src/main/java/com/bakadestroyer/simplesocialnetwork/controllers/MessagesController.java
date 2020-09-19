package com.bakadestroyer.simplesocialnetwork.controllers;

import com.bakadestroyer.simplesocialnetwork.dataaccess.ConversationRepository;
import com.bakadestroyer.simplesocialnetwork.dataaccess.MessageRepository;
import com.bakadestroyer.simplesocialnetwork.dataaccess.UserRepository;
import com.bakadestroyer.simplesocialnetwork.exceptions.UserDoesNotExistException;
import com.bakadestroyer.simplesocialnetwork.exceptions.UserExistsException;
import com.bakadestroyer.simplesocialnetwork.models.Conversation;
import com.bakadestroyer.simplesocialnetwork.models.Message;
import com.bakadestroyer.simplesocialnetwork.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;


@RestController
public class MessagesController {

    @Autowired
    MessageRepository messageRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ConversationRepository conversationRepository;

    @GetMapping("/api/messages")
    public Page<Message> getMessages(@RequestParam(value = "recId") Long recId,
                                     @RequestParam(value = "page",
                                             required = false,
                                             defaultValue = "0") Integer page,
                                     Principal principal) throws UserDoesNotExistException {
        User currentUser = userRepository.findByEmail(principal.getName());
        User reciever = userRepository.findById(recId).orElseThrow(() -> new UserDoesNotExistException(recId));
        Conversation conversation = conversationRepository.findConversationByParticipants(currentUser, reciever);
        Pageable pageable = PageRequest.of(page, 5);
        return messageRepository.findAllByConversation(conversation, pageable);
    }

    @GetMapping("/api/conversations")
    public Page<Conversation> getConversations(@RequestParam(value = "page",
            required = false,
            defaultValue = "0") Integer page, Principal principal) {
        Pageable pageable = PageRequest.of(page, 5);
        User currentUser = userRepository.findByEmail(principal.getName());
        return conversationRepository.findAllByCurrentUser(currentUser, pageable);
    }

    @MessageMapping("/hello/{id}")
    @SendTo("/topic/chat")
    public Message sendMessage(@Payload Message message, Principal principal,
                               @DestinationVariable Long id) throws Exception {
        User receiver = userRepository.findById(id).orElseThrow(() -> new UserExistsException("User not found"));
        User currentUser = userRepository.findByEmail(principal.getName());
        Conversation conversation = conversationRepository.findConversationByParticipants(receiver, currentUser);
        if (conversation == null) {
            conversation = new Conversation(receiver, currentUser);
            conversationRepository.save(conversation);
        } else {
            message.setConversation(conversation);
        }
        message.setSender(currentUser);
        return messageRepository.save(message);
    }
}
