package com.example.themealdb;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TheMealDbApplication {

    public static void main(String[] args) {
        SpringApplication.run(TheMealDbApplication.class, args);
    }
}
