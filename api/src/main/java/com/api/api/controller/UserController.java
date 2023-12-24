package com.api.api.controller;

import com.api.api.dto.LoginDTO;
import com.api.api.dto.UserDTO;
import com.api.api.payLoadResponse.LoginResponse;
import com.api.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path="api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(path="/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        try {
            String id = userService.addUser(userDTO);
            return ResponseEntity.ok("User registered successfully with ID: " + id);
        } catch (Exception e) {
            e.printStackTrace(); // Add this line for logging
            return ResponseEntity.status(500).body("Error registering user: " + e.getMessage());
        }
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO)
    {
        LoginResponse loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}
