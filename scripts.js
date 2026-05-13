document.addEventListener("DOMContentLoaded", () => {
  // Recipe Constructor
  function Recipe(name, ingredients, instructions) {
    this.name = name;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }

  Recipe.prototype.summary = function () {
    return `${this.name} - Ingredients: ${this.ingredients}`;
  };

  // Shared Data
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

  // Add Recipe Logic
  const recipeForm = document.getElementById("recipeForm");
  if (recipeForm) {
    recipeForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("recipeName").value.trim();
      const ingredients = document.getElementById("ingredients").value.trim();
      const instructions = document.getElementById("instructions").value.trim();

      if (!name || !ingredients || !instructions) {
        alert("Fill in Required Fields");
        return;
      }

      const recipe = new Recipe(name, ingredients, instructions);
      recipes.push(recipe);
      localStorage.setItem("recipes", JSON.stringify(recipes));

      alert("Recipe Added 🎊🎉");
      e.target.reset();
    });
  }

  // Gallery Logic
  const recipeList = document.getElementById("recipes");
  const filterInput = document.getElementById("filterInput");

  function displayRecipe(filter = "") {
    if (!recipeList) return;

    recipeList.innerHTML = "";
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const filtered = storedRecipes.filter((r) =>
      r.ingredients.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      recipeList.innerHTML = "<li>No recipes found</li>";
      return;
    }

    filtered.forEach((recipe) => {
      const li = document.createElement("li");
      li.innerHTML = `<h3>${recipe.name}</h3><p>${recipe.ingredients}</p><p>${recipe.instructions}</p>`;
      recipeList.appendChild(li);
    });
  }

  if (filterInput) {
    filterInput.addEventListener("input", (e) => displayRecipe(e.target.value));
    displayRecipe();
  }

  // Planner Logic
  const mealPlan = document.getElementById("mealPlan");
  const addMealForm = document.getElementById("addMealForm");

  function populateMealPlan() {
    if (!mealPlan) return;

    if (recipes.length === 0) {
      mealPlan.innerHTML = "<p>No recipes yet... Add some dawg!</p>";
      return;
    }

    // Example auto-population (optional)
    const daySlots = [
      "monday-breakfast",
      "tuesday-lunch",
      "wednesday-dinner",
      "thursday-breakfast",
      "friday-lunch",
      "saturday-dinner",
      "sunday-breakfast",
    ];

    recipes.forEach((recipe, i) => {
      const slotId = daySlots[i % daySlots.length];
      const slot = document.getElementById(slotId);
      if (slot) slot.textContent = recipe.name;
    });
  }

  if (mealPlan) {
    populateMealPlan();
  }

  if (addMealForm) {
    addMealForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const day = document.getElementById("day").value;
      const mealType = document.getElementById("mealType").value.toLowerCase();
      const mealName = document.getElementById("mealName").value.trim();

      if (!mealName) {
        alert("Enter a recipe name");
        return;
      }

      const slotId = `${day}-${mealType}`; // matches planner.html IDs
      const slot = document.getElementById(slotId);

      if (slot) slot.textContent = mealName;

      alert("Meal Plan Updated!");
      e.target.reset();
    });
  }
});
