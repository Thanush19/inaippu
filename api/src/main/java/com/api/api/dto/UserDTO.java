package com.api.api.dto;
import com.api.api.enumeration.Coordinates;
import com.api.api.enumeration.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {
    private Integer id;

    private String username;
    private String email;
    private String password;
    private String address;
    private Long phone_number;
    private String gender;

    private Coordinates coordinates;

    private String role;
    private List<String> services;
}
