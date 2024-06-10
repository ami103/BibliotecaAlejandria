package com.example.biblioteca_backend.service;

import com.example.biblioteca_backend.model.FavoriteBook;
import com.example.biblioteca_backend.repository.FavoriteBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteBookService {

    @Autowired
    private FavoriteBookRepository repository;

    public List<FavoriteBook> getAllFavoriteBooks() {
        return repository.findAll();
    }

    public FavoriteBook addFavoriteBook(FavoriteBook book) {
        return repository.save(book);
    }

    public void removeFavoriteBook(Long id) {
        repository.deleteById(id);
    }
}
