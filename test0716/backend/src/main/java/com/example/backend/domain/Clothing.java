package com.example.backend.domain;

import javax.persistence.*;

//persistent data from MYSQL table
@Entity
@Table(name = "clothing")
public class Clothing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothing_id")
    private int id;
    @Column(name = "clothing_type")
    private String type;
    @Column(name = "clothing_colour")
    private String colour;
    @Column(name = "clothing_price")
    private float price;
    @Column(name = "clothing_inventory")
    private int inventory;
    @Column(name = "clothing_rating")
    private float rating;
    @Column(name="clothing_image")
    private String image;

    public Clothing() {
    }

    public int getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getColour() {
        return colour;
    }

    public float getPrice() {
        return price;
    }

    public int getInventory() {
        return inventory;
    }

    public float getRating() {
        return rating;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public void setInventory(int inventory) {
        this.inventory = inventory;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getImage() {
        return image;
    }
}
