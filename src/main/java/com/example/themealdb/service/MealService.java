package com.example.themealdb.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MealService {

    private static final String BASE_URL =
            "https://www.themealdb.com/api/json/v1/1/";

    private final RestTemplate restTemplate = new RestTemplate();

    @Cacheable("categories")
    public String getCategories() {
        return restTemplate.getForObject(BASE_URL + "categories.php", String.class);
    }

    @Cacheable(value = "search", key = "#name")
    public String searchMeal(String name) {
        return restTemplate.getForObject(BASE_URL + "search.php?s=" + name, String.class);
    }

    @Cacheable(value = "category", key = "#category")
    public String mealsByCategory(String category) {
        return restTemplate.getForObject(BASE_URL + "filter.php?c=" + category, String.class);
    }

    @Cacheable(value = "meal", key = "#id")
    public String mealById(String id) {
        return restTemplate.getForObject(BASE_URL + "lookup.php?i=" + id, String.class);
    }

    public String randomMeal() {
        return restTemplate.getForObject(BASE_URL + "random.php", String.class);
    }
}
