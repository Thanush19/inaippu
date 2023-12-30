package com.api.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="demands")
public class Demand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String description;
    private String serviceType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private boolean isClosed;
    private boolean isResolved;

    @ManyToOne
    @JoinColumn(name = "resolved_by_user_id")
    private User resolvedByUser;




}

