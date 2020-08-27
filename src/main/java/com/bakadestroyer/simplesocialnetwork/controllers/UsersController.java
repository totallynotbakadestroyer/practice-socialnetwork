package com.bakadestroyer.simplesocialnetwork.controllers;

import com.bakadestroyer.simplesocialnetwork.dataaccess.MessageRepository;
import com.bakadestroyer.simplesocialnetwork.dataaccess.UserRepository;
import com.bakadestroyer.simplesocialnetwork.exceptions.UserExistsException;
import com.bakadestroyer.simplesocialnetwork.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UsersController {
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    private final PasswordEncoder passwordEncoder;

    public UsersController(UserRepository userRepository, MessageRepository messageRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/api/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/api/users/{id}")
    public User getSingleUser(@PathVariable Long id) throws UserExistsException {
        return userRepository.findById(id).orElseThrow(() -> new UserExistsException("User with such id is not found"));
    }

    @PostMapping(value = "/api/users/signup", consumes = "application/json", produces = "application/json")
    public User addUser(@Valid @RequestBody User user) throws UserExistsException {
        if(userRepository.findByEmail(user.getEmail()) != null){
            throw new UserExistsException("User with such email is already exists: " + user.getEmail());
        }
        user.setRole("USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @DeleteMapping(value = "/api/users/{id}", consumes = "application/json")
    public ResponseEntity deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
