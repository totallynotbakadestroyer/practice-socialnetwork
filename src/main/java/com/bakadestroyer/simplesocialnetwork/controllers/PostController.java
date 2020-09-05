package com.bakadestroyer.simplesocialnetwork.controllers;

import com.bakadestroyer.simplesocialnetwork.dataaccess.PostRepository;
import com.bakadestroyer.simplesocialnetwork.dataaccess.UserRepository;
import com.bakadestroyer.simplesocialnetwork.exceptions.UserExistsException;
import com.bakadestroyer.simplesocialnetwork.models.Post;
import com.bakadestroyer.simplesocialnetwork.models.User;
import com.bakadestroyer.simplesocialnetwork.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
        return postRepository.findByDestinationId(user.getId(), pageable);
    }

    @GetMapping("/api/posts/{id}")
    public Post getSinglePost(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        return postRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @PostMapping(consumes = "application/json", value = "/api/posts")
    public Post addPost(@RequestBody Post post, @RequestParam(value = "destId") Long destId)
    {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        post.setAuthorId(userPrincipal.getId());
        post.setAuthorName(userPrincipal.getFirstName() + " " + userPrincipal.getLastName());
        post.setDestinationId(destId);
        return postRepository.save(post);
    }
}
