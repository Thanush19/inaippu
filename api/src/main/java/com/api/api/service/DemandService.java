package com.api.api.service;

import com.api.api.dto.DemandDTO;
import com.api.api.entity.Demand;

import java.util.List;

public interface DemandService {
    DemandDTO createDemand(DemandDTO demandDTO);
    Demand getDemandById(Integer id);
    List<Demand> getAllDemands();
    DemandDTO updateDemand(Integer id, DemandDTO demandDTO);
    void deleteDemand(Integer id);
    List<DemandDTO> getDemandsByUserId(Integer userId);
    //DemandDTO fromDemand(Demand demand);

}
