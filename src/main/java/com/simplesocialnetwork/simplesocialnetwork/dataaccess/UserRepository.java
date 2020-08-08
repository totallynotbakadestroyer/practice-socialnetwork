package com.simplesocialnetwork.simplesocialnetwork.dataaccess;

import com.simplesocialnetwork.simplesocialnetwork.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User, Long> {
}
