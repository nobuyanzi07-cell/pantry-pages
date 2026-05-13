document.addEventListener("DOMContentLoaded", () => {
    //Recipe Constructor
    function Recipe(name,ingredients,instructions) {
        this.name = name
        this.ingredients = ingredients
        this.instructions = instructions
    }
    Recipe.prototype.summary = function() {
        return '${this.name} - Ingredients: ${this.ingredients}'
    }

    //Shared Data
    const recipes = JSON.parse(localStorage.getItem('recipes')) || []

    //Add Recipe Logic
    const recipeForm = document.getElementById('recipeForm')

    if (recipeForm) {
        recipeForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const name = document.getElementById('name').value.trim()
            const ingredients = document.getElementById('ingredients').value.trim()
            const instructions = document.getElementById('instructions').value.trim()

            if (!name || !ingredients || !instructions) {
                alert('Fill in Required Fields')
                return
            }

            const recipe = new Recipe(name,ingredients,instructions)
            recipes.push(recipe)
            localStorage.setItem('recipes', JSON.stringify(recipes))

            alert('Recipe Added 🎊🎉')

            e.target.reset()
         })
    }

    //Gallery logic
    const recipeList = document.getElementById('recipes') // matching <ul id="recipes">
    const filterInput = document.getElementById('filterInput')

    function displayRecipe(filter = '') {
        if(!recipeList) return
        recipeList.innerHTML = ''
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || []
        const filtered = storedRecipes.filter(r =>
            r.ingredients.toLowerCase().includes(filter.toLowerCase())
        )
    }

    if(filtered.length === 0) {
        recipeList.innerHTML = '<li>No recipes found</li>'
        return
    }

    filtered.forEach(recipe => {
        const li = document.createElement('li')
        li.innerHTML = `<h3>${recipe.name}</h3><p>${recipe.ingredients}</p><p>${recipe.instructions}</p>`
        recipeList.appendChild(li)
    })
    
    //Planner Logic


        
        


           
