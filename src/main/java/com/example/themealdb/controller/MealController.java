package com.example.themealdb.controller;

import com.example.themealdb.service.MealService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/categories")
    public String getCategories() {
        return mealService.getCategories();
    }

    @GetMapping("/meals/search")
    public String searchMeal(@RequestParam String name) {
        return mealService.searchMeal(name);
    }

    @GetMapping("/meals/category/{category}")
    public String mealsByCategory(@PathVariable String category) {
        return mealService.mealsByCategory(category);
    }

    @GetMapping("/meals/{id}")
    public String mealById(@PathVariable String id) {
        return mealService.mealById(id);
    }

    @GetMapping("/meals/random")
    public String randomMeal() {
        return mealService.randomMeal();
    }
}
