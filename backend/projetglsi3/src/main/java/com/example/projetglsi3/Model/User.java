package com.example.projetglsi3.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    @NotBlank
    @Size(max = 50)
    @Column(unique = true)
    private String username;

    @NotBlank
    @Size(max = 120)
    private String password;

    public Long getId() {
        return id;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    @NotBlank
    @Size(max = 50)
    @Email
    @Column(unique = true)
    private String email;
    @Column
            @Size(max = 500)
    String img;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private UserRole role;

    public enum UserRole {
        RIDER,
        PASSENGER
    }
    // Helper method to check if the user is a rider
    public boolean isRider() {
        return this.role == UserRole.RIDER;
    }

    // Helper method to check if the user is a passenger
    public boolean isPassenger() {
        return this.role == UserRole.PASSENGER;
    }
}

