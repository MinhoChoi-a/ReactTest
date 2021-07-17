package com.example.backend.service;

import com.example.backend.domain.CartItem;
import com.example.backend.domain.Clothing;
import com.example.backend.repository.ClothingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

//Clothing data managing service
@Service
@Transactional
public class ClothingService {

    @Autowired
    private ClothingRepository repo;

    public List<Clothing> listAllClothings() {

        return repo.findAll();
    }

    public List<Clothing> updateInventory(List<CartItem> itemList) {

        //List<Clothing> original = repo.findAll();

        for (CartItem item:itemList) {

            System.out.println(item.getId());
            System.out.println(item.getQty());

            Clothing purchasedItem = repo.findById(item.getId());

            int inventory = purchasedItem.getInventory() - item.getQty();

            purchasedItem.setInventory(inventory);

            repo.save(purchasedItem);
        }

        System.out.println(repo.findAll());

        return repo.findAll();
    }
}
