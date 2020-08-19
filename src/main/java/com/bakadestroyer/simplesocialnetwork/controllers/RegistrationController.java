package com.bakadestroyer.simplesocialnetwork.controllers;

import com.bakadestroyer.simplesocialnetwork.dataaccess.MessageRepository;
import com.bakadestroyer.simplesocialnetwork.dataaccess.UserRepository;
import com.bakadestroyer.simplesocialnetwork.exceptions.UserExistsException;
import com.bakadestroyer.simplesocialnetwork.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RegistrationController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/api/users")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @PostMapping(value = "/api/users/signup", consumes = "application/json")
    public User addUser(@RequestBody User user) throws UserExistsException {
        if(userRepository.findByEmail(user.getEmail()) != null){
            throw new UserExistsException("User with such email is already exists: " + user.getEmail());
        }
        user.setRole("USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}
