package com.bakadestroyer.simplesocialnetwork.dataaccess;

import com.bakadestroyer.simplesocialnetwork.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository <Post, Long> {
    Page<Post> findByUserId(Long userId, Pageable pageable);
}
