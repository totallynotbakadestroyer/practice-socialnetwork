package com.bakadestroyer.simplesocialnetwork.controllers;

import com.bakadestroyer.simplesocialnetwork.dataaccess.PostRepository;
import com.bakadestroyer.simplesocialnetwork.dataaccess.UserRepository;
import com.bakadestroyer.simplesocialnetwork.exceptions.UserExistsException;
import com.bakadestroyer.simplesocialnetwork.models.Post;
import com.bakadestroyer.simplesocialnetwork.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class PostController {
    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/api/posts")
    public Page<Post> getAllPosts(@RequestParam(value = "id") Long id,
                                  @RequestParam(value = "page", required = false, defaultValue = "0") Integer page) throws UserExistsException {
        User user = userRepository.findById(id).orElseThrow(() -> new UserExistsException("User not found"));
        Pageable pageable = PageRequest.of(page, 5, Sort.by("date").descending());
        return postRepository.findByDestinationUser_Id(user.getId(), pageable);
    }

    @GetMapping("/api/posts/{id}")
    public Post getSinglePost(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        return postRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @PostMapping(consumes = "application/json", value = "/api/posts")
    public Post addPost(@RequestBody Post post, @RequestParam(value = "destId") Long destId, @AuthenticationPrincipal Principal principal) throws UserExistsException {
        post.setAuthor(userRepository.findByEmail(principal.getName()));
        User destinationUser = userRepository.findById(destId).orElseThrow(() -> new UserExistsException("User with such id has not found"));
        post.setDestinationUser(destinationUser);
        return postRepository.save(post);
    }
}
