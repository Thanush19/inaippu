package com.api.api.service;

import com.api.api.dto.LoginDTO;
import com.api.api.dto.UserDTO;
import com.api.api.payLoadResponse.LoginResponse;

import java.util.List;

public interface UserService {

    String addUser(UserDTO userDTO);


    LoginResponse loginUser(LoginDTO loginDTO);
    List<UserDTO> getAllUsers();
}
