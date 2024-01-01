package com.api.api.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class DemandDTO {

    private Integer id;
    private String description;
    private String serviceType;
    private Integer userId;
    private boolean isClosed;
    private boolean isResolved;
    private Integer resolvedByUserId;
}
