package com.api.api.payLoadResponse;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class LoginResponse {
    String response;
    boolean status;
}
