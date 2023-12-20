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
    public String registerUser(@RequestBody UserDTO userDTO){
        String id = userService.addUser(userDTO);
        return id;
    }
    @GetMapping(path="/register")
    public String testing(){
        return  "hiiiiii";
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO)
    {
        LoginResponse loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}
