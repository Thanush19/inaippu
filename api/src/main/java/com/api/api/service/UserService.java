package com.api.api.service;

import com.api.api.dto.LoginDTO;
import com.api.api.dto.UserDTO;
import com.api.api.payLoadResponse.LoginResponse;

public interface UserService {

    String addUser(UserDTO userDTO);

    LoginResponse loginUser(LoginDTO loginDTO);
}
