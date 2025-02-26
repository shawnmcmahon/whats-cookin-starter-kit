class Recipe {
  constructor(recipe, ingredientsData) {
    this.id =  recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.ingredientsData = ingredientsData;
  }

  retrieveRecipeInstructions() {
    return this.instructions;
  }

  retrieveIngredientNames() {
    const ingredientIds = this.ingredients.map(ingredient => ingredient.id);
    const ingredientNames = this.ingredientsData.reduce((acc, ingredient) => {
      ingredientIds.forEach(id => {
        if (id === ingredient.id) {
          acc.push(ingredient.name);
        }

      })
      return acc;
    }, [])
    return ingredientNames;
  }

  calculateRecipeCost() {
    let recipeCost = 0;

    this.ingredients.forEach(ingredient => {
      this.ingredientsData.find(item => {
        if (ingredient.id === item.id) {
          recipeCost += (item.estimatedCostInCents * ingredient.quantity.amount) / 100;
        }

      });
    })
      return parseFloat(recipeCost.toFixed(2));
  }
}

export default Recipe;
