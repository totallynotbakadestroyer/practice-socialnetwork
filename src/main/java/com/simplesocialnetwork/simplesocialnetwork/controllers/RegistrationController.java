package com.simplesocialnetwork.simplesocialnetwork.controllers;

import com.simplesocialnetwork.simplesocialnetwork.dataaccess.MessageRepository;
import com.simplesocialnetwork.simplesocialnetwork.dataaccess.UserRepository;
import com.simplesocialnetwork.simplesocialnetwork.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RegistrationController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;

    @GetMapping("/api/users")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/api/users")
    public User addUser(@RequestBody User user){
        return userRepository.save(user);
    }
}
