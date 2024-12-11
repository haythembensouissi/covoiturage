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
import java.util.Optional;

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

        try {
            User newUser = new User();
            newUser.setUsername(user.getUsername());
            newUser.setEmail(user.getEmail());
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            newUser.setRole(user.getRole());
            userRepository.save(newUser);
            Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            UserDetails userDetails = CUserDetailsService.loadUserByUsername(user.getUsername());
            String jwt = tokenProvider.
                    generateToken(authentication);
            Map<String, String> response = new HashMap<>();

            Optional<User> loggedUser=userRepository.findByUsername(user.getUsername());
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());
            response.put("role", user.getRole().toString());
            response.put("token", jwt);
            response.put("id", loggedUser.get().getId().toString());
            return ResponseEntity.ok(response);

        }
        catch(Exception e){
            if(userRepository.existsByUsername(user.getUsername()) ){
              return   ResponseEntity.badRequest().body("Username is already taken");
            }
            if(userRepository.existsByEmail(user.getEmail())) {
                return ResponseEntity.badRequest().body("Email is already taken");
            }
            else {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }


        // Create new user's account



    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
try {
    Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
    UserDetails userDetails = CUserDetailsService.loadUserByUsername(loginRequest.getUsername());
    System.out.println(userDetails);
    String jwt = tokenProvider.
            generateToken(authentication);
    Optional<User> loggedUser=userRepository.findByUsername(loginRequest.getUsername());
    Map<String, String> response = new HashMap<>();
    response.put("role",loggedUser.get().getRole().toString());
    response.put("id",loggedUser.get().getId().toString());
    response.put("token", jwt);

    return ResponseEntity.ok(response);
}catch (Exception e){
    return ResponseEntity.badRequest().body(e.getMessage());
}



}
}