package com.api.api.dto;


import com.api.api.entity.Demand;
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
    private String userAddress;  // Added userAddress field
    private String resolvedByUserAddress;  // Added resolvedByUserAddress field

    public static DemandDTO fromDemand(Demand demand) {
        return DemandDTO.builder()
                .id(demand.getId())
                .description(demand.getDescription())
                .serviceType(demand.getServiceType())
                .userId(demand.getUser() != null ? demand.getUser().getId() : null)
                .isClosed(demand.isClosed())
                .isResolved(demand.isResolved())
                .resolvedByUserId(demand.getResolvedByUser() != null ? demand.getResolvedByUser().getId() : null)
                .userAddress(demand.getUser() != null ? demand.getUser().getCoordinates().toString() : null)
                .resolvedByUserAddress(demand.getResolvedByUser() != null ? demand.getResolvedByUser().getCoordinates().toString() : null)
                .build();
    }
}
