package com.bakadestroyer.simplesocialnetwork.controllers;

import com.bakadestroyer.simplesocialnetwork.dataaccess.MessageRepository;
import com.bakadestroyer.simplesocialnetwork.dataaccess.UserRepository;
import com.bakadestroyer.simplesocialnetwork.models.User;
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

    @PostMapping(value = "/api/users/signup", consumes = "application/json")
    public User addUser(@RequestBody User user){
        return userRepository.save(user);
    }
}
