package com.api.api.entity;

import jakarta.persistence.*;
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

@Table(name="roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;


}
