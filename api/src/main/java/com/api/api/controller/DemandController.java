package com.api.api.controller;


import com.api.api.dto.DemandDTO;
import com.api.api.entity.Demand;
import com.api.api.service.DemandService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path="api")

public class DemandController {
    @Autowired
    private DemandService demandService;

    @PostMapping(path="/create-demand")
    public ResponseEntity<DemandDTO> createDemand(@RequestBody DemandDTO demandDTO) {
        DemandDTO createdDemand = demandService.createDemand(demandDTO);
        return new ResponseEntity<>(createdDemand, HttpStatus.CREATED);
    }
    @GetMapping(path="/demands-by-user/{userId}")
    public ResponseEntity<List<DemandDTO>> getDemandsByUserId(@PathVariable Integer userId) {
        List<DemandDTO> demands = demandService.getDemandsByUserId(userId);
        return new ResponseEntity<>(demands, HttpStatus.OK);
    }
    @GetMapping(path="/resident-demand")
    public ResponseEntity<List<DemandDTO>> residentsDemand() {
        List<DemandDTO> demandDTOs = demandService.getAllDemands().stream()
                .map(DemandDTO::fromDemand) // Assuming you have a static method in DemandDTO to convert to DemandDTO
                .collect(Collectors.toList());

        return new ResponseEntity<>(demandDTOs, HttpStatus.OK);
    }




}