package com.simplesocialnetwork.simplesocialnetwork.models;

import javax.persistence.*;
import java.util.Date;

public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    private Date dateSent;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User receiver;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User sender;

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getDateSent() {
        return dateSent;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Message(String text, User receiver, User sender) {
        this.text = text;
        this.receiver = receiver;
        this.sender = sender;
        this.dateSent = new Date(System.currentTimeMillis());
    }

    public Message() {
    }
}
