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

        
        


           
