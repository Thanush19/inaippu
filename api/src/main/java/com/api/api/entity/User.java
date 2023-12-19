package com.api.api.entity;
import com.api.api.enumeration.Coordinates;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
//instead od setting constructors manually we can use @Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
//map to tables in a relational database

@Table(name="users")
//allows you to explicitly specify the name of the database table to which an entity class should be mapped

public class User {
    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // tells way to generate the ky , here useing identity similar to serial in pgsql
    private Integer id;

    private String username;
    private String email;
    private String password;
    private String address;
    private int phone_number;
    private String role;
    private String[] services;
    private Coordinates coordinates;




//    @Embedded
//    @OneToOne
//    @JoinColumn(name="role_id")


}
