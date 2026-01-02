const express = require("express");
const axios = require("axios");
const cache = require("./cache");

const app = express();
const PORT = 5000;
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

app.use(express.json());
app.use(require("cors")());

async function fetchWithCache(key, url) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  const response = await axios.get(url);
  cache.set(key, response.data);
  return response.data;
}

app.get("/api/meals/search", async (req, res) => {
  try {
    const name = req.query.name;
    const data = await fetchWithCache(
      `search_${name}`,
      `${BASE_URL}/search.php?s=${name}`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch meals" });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const data = await fetchWithCache(
      "categories",
      `${BASE_URL}/categories.php`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

app.get("/api/meals/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const data = await fetchWithCache(
      `category_${category}`,
      `${BASE_URL}/filter.php?c=${category}`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch meals" });
  }
});

app.get("/api/meals/random", async (req, res) => {
  try {
    const data = await axios.get(`${BASE_URL}/random.php`);
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch random meal" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

app.get("/api/meals/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await fetchWithCache(
      `meal_${id}`,
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch meal details" });
  }
});
