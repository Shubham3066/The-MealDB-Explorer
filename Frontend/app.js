const API = "http://localhost:5000/api";

async function loadCategories() {
  try {
    const res = await fetch(`${API}/categories`);
    const data = await res.json();

    const div = document.getElementById("categories");
    div.innerHTML = "<h2>Categories</h2>";

    if (!data.categories) {
      div.innerHTML += "<p>No categories found</p>";
      return;
    }

    data.categories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.textContent = cat.strCategory;
      btn.onclick = () => loadByCategory(cat.strCategory);
      div.appendChild(btn);
    });
  } catch (err) {
    console.error(err);
    document.getElementById("categories").innerHTML =
      "<p>Error loading categories</p>";
  }
}

async function loadByCategory(category) {
  const mealsDiv = document.getElementById("meals");
  mealsDiv.innerHTML = `<p>Loading ${category} meals...</p>`;

  try {
    const res = await fetch(`${API}/meals/category/${category}`);
    const data = await res.json();

    if (!data.meals) {
      mealsDiv.innerHTML = `<p>No meals found for ${category}</p>`;
      return;
    }

    const detailedMeals = await Promise.all(
      data.meals.slice(0, 10).map(async (meal) => {
        const r = await fetch(`${API}/meals/${meal.idMeal}`);
        const d = await r.json();
        return d.meals ? d.meals[0] : null;
      })
    );

    displayMeals(detailedMeals.filter(Boolean));
  } catch (err) {
    console.error(err);
    mealsDiv.innerHTML = "<p>Error loading meals</p>";
  }
}

async function searchMeal() {
  const name = document.getElementById("searchInput").value;
  const res = await fetch(`${API}/meals/search?name=${name}`);
  const data = await res.json();
  displayMeals(data.meals);
}

async function getRandomMeal() {
  const res = await fetch(`${API}/meals/random`);
  const data = await res.json();
  displayMeals(data.meals);
}

function displayMeals(meals) {
  const div = document.getElementById("meals");
  div.innerHTML = "";

  if (!meals || meals.length === 0) {
    div.innerHTML = "<p>No meals found</p>";
    return;
  }

  meals.forEach((meal) => {
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const qty = meal[`strMeasure${i}`];
      if (ing) ingredients += `<li>${ing} - ${qty}</li>`;
    }

    div.innerHTML += `
      <div class="meal">
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" />
        <h4>Ingredients</h4>
        <ul>${ingredients}</ul>
        <p>${meal.strInstructions || ""}</p>
      </div>
    `;
  });
}

loadCategories();
