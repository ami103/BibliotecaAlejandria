package com.example.biblioteca_backend.controller;

import com.example.biblioteca_backend.model.Book;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/books")
    public List<Book> getBooks() {
        String url = "https://gutendex.com/books";
        RestTemplate restTemplate = new RestTemplate();
        GutendexResponse response = restTemplate.getForObject(url, GutendexResponse.class);
        return response.getResults();
    }

    static class GutendexResponse {
        private List<Book> results;

        public List<Book> getResults() {
            return results;
        }

        public void setResults(List<Book> results) {
            this.results = results;
        }
    }

     @GetMapping("/fetchBookContent")
    public String fetchBookContent(@RequestParam String url) {
        return restTemplate.getForObject(url, String.class);
    }
}
