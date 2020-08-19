package com.bakadestroyer.simplesocialnetwork.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "User with such email is already exists!")
public class UserExistsException extends Exception {
    public UserExistsException(String errorMessage){
        super(errorMessage);
    }

}
