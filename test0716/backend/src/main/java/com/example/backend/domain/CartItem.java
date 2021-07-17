package com.example.backend.domain;

//Data Entity to get data from client's post request
public class CartItem {

    private int id;
    private int qty;

    public CartItem() {
    }

    public CartItem(int id, int quantity) {
        this.id = id;
        this.qty = quantity;
    }

    public int getId() {
        return id;
    }

    public int getQty() {
        return qty;
    }
}
