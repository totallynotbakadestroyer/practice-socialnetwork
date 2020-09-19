package com.bakadestroyer.simplesocialnetwork.exceptions;

import com.bakadestroyer.simplesocialnetwork.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Conversation with such id does not exist")
public class ConversationDoesNotExistException extends Exception {
    public ConversationDoesNotExistException(Long convId){
        super("Conversation with id: " + convId + " does not exist.");
    }

}
