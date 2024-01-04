package com.api.api.service.impl;


import com.api.api.dto.DemandDTO;
import com.api.api.entity.Demand;
import com.api.api.repository.DemandRepository;
import com.api.api.repository.UserRepository;
import com.api.api.service.DemandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DemandIMPL implements DemandService {
    @Autowired
    private DemandRepository demandRepository;
    @Autowired
    private UserRepository userRepository;
    private DemandDTO convertToDTO(Demand demand) {
        DemandDTO demandDTO = new DemandDTO();
        demandDTO.setId(demand.getId());
        demandDTO.setDescription(demand.getDescription());
        demandDTO.setServiceType(demand.getServiceType());
        demandDTO.setUserId(demand.getUser() != null ? demand.getUser().getId() : null);
        demandDTO.setClosed(demand.isClosed());
        demandDTO.setResolved(demand.isResolved());
        demandDTO.setResolvedByUserId(demand.getResolvedByUser() != null ? demand.getResolvedByUser().getId() : null);
        return demandDTO;
    }


    public DemandDTO createDemand(DemandDTO demandDTO) {
        try {
            Demand demand = new Demand();
            demand.setDescription(demandDTO.getDescription());
            demand.setServiceType(demandDTO.getServiceType());
            demand.setUser(userRepository.findById(demandDTO.getUserId()).orElse(null));
            demand.setClosed(demandDTO.isClosed());
            demand.setResolved(demandDTO.isResolved());
            demand.setResolvedByUser(
                    demandDTO.getResolvedByUserId() != null ?
                            userRepository.findById(demandDTO.getResolvedByUserId()).orElse(null) :
                            null
            );
            return convertToDTO(demandRepository.save(demand));
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Error creating demand: " + e.getMessage(), e);
        }
    }

    public static DemandDTO fromDemand(Demand demand) {
        return DemandDTO.builder()
                .id(demand.getId())
                .description(demand.getDescription())
                .serviceType(demand.getServiceType())
                .userId(demand.getUser() != null ? demand.getUser().getId() : null)
                .isClosed(demand.isClosed())
                .isResolved(demand.isResolved())
                .resolvedByUserId(demand.getResolvedByUser() != null ? demand.getResolvedByUser().getId() : null)
                .build();
    }
    public List<DemandDTO> getDemandsByUserId(Integer userId) {
        List<Demand> demands = demandRepository.findByUser_Id(userId);
        return demands.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    public List<Demand> getAllDemands() {
        return demandRepository.findAll();
    }

    public Demand getDemandById(Integer id) {
        Optional<Demand> optionalDemand = demandRepository.findById(id);
        return optionalDemand.orElse(null);
    }
    public Demand updateDemand(Integer id, DemandDTO demandDTO) {
        Optional<Demand> optionalDemand = demandRepository.findById(id);
        if (optionalDemand.isPresent()) {
            Demand demand = optionalDemand.get();
            // Update demand properties
            demand.setDescription(demandDTO.getDescription());
            demand.setServiceType(demandDTO.getServiceType());
            // Update other properties and relationships

            return demandRepository.save(demand);
        }
        return null;
    }
    public void deleteDemand(Integer id) {
        demandRepository.deleteById(id);
    }




}
