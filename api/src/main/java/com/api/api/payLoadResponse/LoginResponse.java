package com.api.api.payLoadResponse;

import com.api.api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Optional;

@Data
@AllArgsConstructor
public class LoginResponse {
    String response;
    boolean status;
    User user;
    public LoginResponse(String response, boolean status, Optional<User> user) {
        this.response = response;
        this.status = status;
        this.user = user.orElse(null);
    }

    public LoginResponse(String response, boolean status) {
        this.response = response;
        this.status = status;
    }
}
