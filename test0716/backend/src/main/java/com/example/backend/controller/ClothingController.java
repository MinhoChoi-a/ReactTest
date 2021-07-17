package com.example.backend.controller;

import com.example.backend.domain.CartItem;
import com.example.backend.domain.Clothing;
import com.example.backend.service.ClothingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
public class ClothingController {

    @Autowired
    private ClothingService service;

    //get all clothing data
    @GetMapping("/api/clothing")
    public List<Clothing> getAllClothings() {

        List list = service.listAllClothings();

        return list;
    }

    //update inventory data
    @PostMapping(value = "/api/clothing")
    public List<Clothing> updateInventory(@RequestBody List<CartItem> itemList) {

        List list = service.updateInventory(itemList);

        return list;
    }
}



