package com.api.api.service.impl;

import com.api.api.dto.LoginDTO;
import com.api.api.dto.UserDTO;
import com.api.api.entity.User;
import com.api.api.payLoadResponse.LoginResponse;
import com.api.api.repository.UserRepository;
import com.api.api.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserIMPL implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public List<UserDTO> getAllUsers(){
        List<User> users = userRepository.findAll();
        return users.stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setAddress(user.getAddress());
        userDTO.setPhone_number(user.getPhone_number());        userDTO.setRole(user.getRole());
        userDTO.setServices(user.getServices());
        userDTO.setCoordinates(user.getCoordinates());
        return userDTO;
    }
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
    UserDTO userDTO;

    @Override
    public LoginResponse loginUser(LoginDTO loginDTO) {
        String msg = "";
        User user1 = userRepository.findByEmail(loginDTO.getEmail());
        if (user1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<User> user = userRepository.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (user.isPresent()) {
                    return new LoginResponse("Login Success", true,user);
                } else {
                    return new LoginResponse("Login Failed", false, user);
                }
            } else {
                return new LoginResponse("password Not Match", false);
            }
        }else {
            return new LoginResponse("Email not exits", false);
        }    }
}
