package com.example.backend.repository;

import com.example.backend.domain.Clothing;
import org.springframework.data.jpa.repository.JpaRepository;

//JPA Repository to work as data access layer
public interface ClothingRepository extends JpaRepository<Clothing, Integer> {
    Clothing findById(int id);
}


