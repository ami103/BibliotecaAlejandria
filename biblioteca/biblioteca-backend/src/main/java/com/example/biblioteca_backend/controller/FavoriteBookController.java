package com.example.biblioteca_backend.controller;

import com.example.biblioteca_backend.model.FavoriteBook;
import com.example.biblioteca_backend.service.FavoriteBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/favorites")  // Cambiado a /api/favorites para que coincida con la URL del error
public class FavoriteBookController {

    @Autowired
    private FavoriteBookService service;

    @GetMapping
    public List<FavoriteBook> getAllFavorites() {
        return service.getAllFavoriteBooks();
    }

    @PostMapping
    public FavoriteBook addFavoriteBook(@RequestBody FavoriteBook book) {
        return service.addFavoriteBook(book);
    }

    @DeleteMapping("/{id}")
    public void removeFavoriteBook(@PathVariable Long id) {
        service.removeFavoriteBook(id);
    }
}
