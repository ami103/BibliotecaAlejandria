package com.example.biblioteca_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/proxy")
public class ProxyController {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @CrossOrigin(originPatterns = "", allowCredentials = "true", allowedHeaders = "")
    @GetMapping("/{id}/html")
    public Mono<ResponseEntity<String>> getBookHtml(@PathVariable String id) {
        String url = "https://www.gutenberg.org/ebooks/" + id + ".html.images";
        
        return webClientBuilder.build()
            .get()
            .uri(url)
            .retrieve()
            .toEntity(String.class)
            .map(response -> ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "text/html")
                .body(response.getBody()));
    }
}
