package com.api.api.service.impl;

import com.api.api.dto.UserDTO;
import com.api.api.entity.User;
import com.api.api.repository.UserRepository;
import com.api.api.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserIMPL implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UserDTO userDTO) {
        // Check if the username or email is already registered
        if (userRepository.existsByUsername(userDTO.getUsername()) || userRepository.existsByEmail(userDTO.getEmail())) {
            return "Username or email already exists";
        }

        // Create a User entity from the DTO
        User user = User.builder()
                .username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword())) // Hash the password
                .address(userDTO.getAddress())
                .phone_number(userDTO.getPhone_number())
                .services(userDTO.getServices())
                .role(userDTO.getRole())
                .coordinates(userDTO.getCoordinates())
                .build();

        userRepository.save(user);

        return "User added successfully" + user.getUsername();
    }
}
