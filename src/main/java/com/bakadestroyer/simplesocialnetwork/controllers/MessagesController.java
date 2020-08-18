package com.bakadestroyer.simplesocialnetwork.controllers;

import com.bakadestroyer.simplesocialnetwork.dataaccess.MessageRepository;
import com.bakadestroyer.simplesocialnetwork.dataaccess.UserRepository;
import com.bakadestroyer.simplesocialnetwork.models.Message;
import com.bakadestroyer.simplesocialnetwork.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class MessagesController {

    @Autowired
    MessageRepository messageRepository;
    @Autowired
    UserRepository userRepository;

    @GetMapping("/api/messages")
    public List<Message> getMessages(){
        return messageRepository.findAll();
    }

    @PostMapping("/api/messages")
    public Message sendMessage(@RequestBody Message message,
                               @RequestParam Long recId){
        User receiver = userRepository.findById(recId).orElseThrow();
        message.setReceiver(receiver);
        return messageRepository.save(message);
    }
}
