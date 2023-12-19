package com.api.api.dto;
import com.api.api.enumeration.Coordinates;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private int phone_number;
    private Coordinates coordinates;

    private String role;
    private String[] services;
}
