package com.example.projetglsi3.Auth.Controller;

import com.example.projetglsi3.Auth.Security.CUserDetailsService;
import com.example.projetglsi3.Dto.UserDto;
import com.example.projetglsi3.Exception.ResourceNotFoundException;
import com.example.projetglsi3.Model.Ride;
import com.example.projetglsi3.Model.User;
import com.example.projetglsi3.Repository.userRepository;
import com.example.projetglsi3.Auth.Security.JWTTokenProvider;
import com.example.projetglsi3.Service.ReservationServiceImpl;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(userRepository.class);
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
            newUser.setImg(user.getImg());
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
            response.put("img", user.getImg());
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
    response.put("username",loggedUser.get().getUsername().toString());
    response.put("email",loggedUser.get().getEmail().toString());
    response.put("id",loggedUser.get().getId().toString());
    response.put("img",loggedUser.get().getImg());
    response.put("token", jwt);

    return ResponseEntity.ok(response);
}catch (Exception e){
    return ResponseEntity.badRequest().body(e.getMessage());
}



}
    @PutMapping("/updateuser/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        logger.info("Updating user with id: {}", id);
        return userRepository.findById(id)
                .map(existingUser -> {
                    logger.info("Found user: {}, updating with new data: {}", existingUser, updatedUser);

                   existingUser.setEmail(updatedUser.getEmail());
                   existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                   existingUser.setUsername(updatedUser.getUsername());
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new ResourceNotFoundException("user not found with id " + id));
    }

}