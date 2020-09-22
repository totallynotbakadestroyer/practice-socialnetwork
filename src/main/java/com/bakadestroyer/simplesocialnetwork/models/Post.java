package com.bakadestroyer.simplesocialnetwork.models;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    private User author;
    @ManyToOne
    private User destinationUser;
    private Date date = new Date();
    private String postText;
    private String postImage;
    private String postAddition;

    public Date getDate() {
        return date;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public User getDestinationUser() {
        return destinationUser;
    }

    public void setDestinationUser(User destinationUser) {
        this.destinationUser = destinationUser;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getPostText() {
        return postText;
    }

    public void setPostText(String postText) {
        this.postText = postText;
    }

    public String getPostImage() {
        return postImage;
    }

    public void setPostImage(String postImage) {
        this.postImage = postImage;
    }

    public String getPostAddition() {
        return postAddition;
    }

    public void setPostAddition(String postAddition) {
        this.postAddition = postAddition;
    }
}
