package com.bakadestroyer.simplesocialnetwork.controllers;

import com.bakadestroyer.simplesocialnetwork.dataaccess.PostRepository;
import com.bakadestroyer.simplesocialnetwork.models.Post;
import com.bakadestroyer.simplesocialnetwork.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {
    @Autowired
    PostRepository postRepository;

    @GetMapping("/api/posts")
    public Page<Post> getPosts( Pageable pageable,
                                @RequestParam(value = "page", required = false, defaultValue = "0") Integer page){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        pageable = PageRequest.of(0, 5, Sort.by("date").descending());
        return postRepository.findByUserId(userPrincipal.getId(), pageable);

    }

    @PostMapping(consumes = "application/json", value = "/api/posts")
    public void addPost()
    {

    }
}
