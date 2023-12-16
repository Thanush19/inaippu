package com.api.api.user;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
//instead od setting constructors manually we can use @Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
//map to tables in a relational database

@Table(name="users")
//allows you to explicitly specify the name of the database table to which an entity class should be mapped
public class User implements UserDetails {

    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // tells way to generate the ky , here useing identity similar to serial in pgsql
    private Integer id;

    private String username;
    private String email;
    private String password;
    private String address;
    private int phone_number;


    @Enumerated(EnumType.STRING)
    private Role role;//store roles as a string in db
    public String getAddressForDisplay(){
        // Return null for admin, otherwise return the address

        return (Role.ADMIN.equals(role))?null:address;}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
    @Override
    public String getUsername(){
        return username;
    }
    @Override
    public 	String getPassword(){
        return password;
    }



    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}