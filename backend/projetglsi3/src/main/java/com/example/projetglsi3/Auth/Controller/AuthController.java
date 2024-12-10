package com.example.projetglsi3.Auth.Controller;

import com.example.projetglsi3.Auth.Security.CUserDetailsService;
import com.example.projetglsi3.Dto.UserDto;
import com.example.projetglsi3.Model.User;
import com.example.projetglsi3.Repository.userRepository;
import com.example.projetglsi3.Auth.Security.JWTTokenProvider;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    CUserDetailsService CUserDetailsService;
    @Autowired
    userRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JWTTokenProvider tokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if(userRepository.existsByUsername(user.getUsername()) ){
            ResponseEntity.badRequest().body("Username is already taken");
        }
        if(userRepository.existsByEmail(user.getEmail())) {
            ResponseEntity.badRequest().body("Email is already taken");
        }

        // Create new user's account
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole(user.getRole());
        userRepository.save(newUser);


        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {

        Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        UserDetails userDetails = CUserDetailsService.loadUserByUsername(loginRequest.getUsername());
        String jwt = tokenProvider.
                generateToken(authentication);
        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);
        return ResponseEntity.ok(response);
    }

}