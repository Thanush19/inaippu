package com.api.api.repository;

import com.api.api.entity.Demand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DemandRepository extends JpaRepository<Demand,Integer> {
    List<Demand> findByUser_Id(Integer userId);

}
