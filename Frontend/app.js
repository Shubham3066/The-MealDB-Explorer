// ==============================
// API CONFIG (JAVA BACKEND)
// ==============================
const API_BASE = "http://localhost:5000/api";

// ==============================
// LOAD CATEGORIES ON PAGE LOAD
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
});

// ==============================
// LOAD CATEGORIES
// ==============================
async function loadCategories() {
  const categoriesDiv = document.getElementById("categories");
  categoriesDiv.innerHTML = "Loading categories...";

  try {
    const response = await fetch(`${API_BASE}/categories`);
    const data = await response.json();

    categoriesDiv.innerHTML = "";

    data.categories.forEach((category) => {
      const btn = document.createElement("button");
      btn.className = "category-btn";
      btn.innerText = category.strCategory;

      btn.onclick = () => loadMealsByCategory(category.strCategory);
      categoriesDiv.appendChild(btn);
    });
  } catch (error) {
    console.error(error);
    categoriesDiv.innerText = "Error loading categories";
  }
}

// ==============================
// LOAD MEALS BY CATEGORY
// ==============================
async function loadMealsByCategory(category) {
  const mealsDiv = document.getElementById("meals");
  mealsDiv.innerHTML = "Loading meals...";

  try {
    const response = await fetch(`${API_BASE}/meals/category/${category}`);
    const data = await response.json();

    mealsDiv.innerHTML = "";

    if (!data.meals) {
      mealsDiv.innerText = "No meals found";
      return;
    }

    data.meals.forEach((meal) => {
      const card = document.createElement("div");
      card.className = "meal-card";

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
      `;

      card.onclick = () => loadMealDetails(meal.idMeal);
      mealsDiv.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    mealsDiv.innerText = "Error loading meals";
  }
}

// ==============================
// SEARCH MEAL BY NAME
// ==============================
async function searchMeal() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const mealsDiv = document.getElementById("meals");
  mealsDiv.innerHTML = "Searching...";

  try {
    const response = await fetch(`${API_BASE}/meals/search?name=${query}`);
    const data = await response.json();

    mealsDiv.innerHTML = "";

    if (!data.meals) {
      mealsDiv.innerText = "No meals found";
      return;
    }

    data.meals.forEach((meal) => {
      const card = document.createElement("div");
      card.className = "meal-card";

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
      `;

      card.onclick = () => loadMealDetails(meal.idMeal);
      mealsDiv.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    mealsDiv.innerText = "Error searching meals";
  }
}

// ==============================
// RANDOM MEAL
// ==============================
async function randomMeal() {
  const mealsDiv = document.getElementById("meals");
  mealsDiv.innerHTML = "Loading random meal...";

  try {
    const response = await fetch(`${API_BASE}/meals/random`);
    const data = await response.json();

    mealsDiv.innerHTML = "";
    showMealDetails(data.meals[0]);
  } catch (error) {
    console.error(error);
    mealsDiv.innerText = "Error loading random meal";
  }
}

// ==============================
// LOAD MEAL DETAILS
// ==============================
async function loadMealDetails(id) {
  const mealsDiv = document.getElementById("meals");
  mealsDiv.innerHTML = "Loading meal details...";

  try {
    const response = await fetch(`${API_BASE}/meals/${id}`);
    const data = await response.json();

    showMealDetails(data.meals[0]);
  } catch (error) {
    console.error(error);
    mealsDiv.innerText = "Error loading meal details";
  }
}

// ==============================
// DISPLAY MEAL DETAILS
// ==============================
function showMealDetails(meal) {
  const mealsDiv = document.getElementById("meals");

  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients += `<li>${ingredient} - ${measure}</li>`;
    }
  }

  mealsDiv.innerHTML = `
    <div class="meal-details">
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>Ingredients</h3>
      <ul>${ingredients}</ul>
      <h3>Instructions</h3>
      <p>${meal.strInstructions}</p>
      ${
        meal.strYoutube
          ? `<iframe src="https://www.youtube.com/embed/${
              meal.strYoutube.split("v=")[1]
            }" allowfullscreen></iframe>`
          : ""
      }
    </div>
  `;
}
