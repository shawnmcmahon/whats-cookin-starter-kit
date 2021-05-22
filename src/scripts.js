import './styles.css';
import apiCalls from './apiCalls';
import domUpdates from './domUpdates'
import RecipeRepository from './classes/RecipeRepository'
import User from './classes/User'

let recipeRepository, user;
let globalIngredientsData = {}

//Query Selectors
const favoriteBtn = document.querySelector('.favoriteRecipesBtn');
const cookbookBtn = document.querySelector('.cookbookBtn');
const searchInput = document.querySelector('#searchField');
const allRecipeCards = document.querySelector('#allRecipeCards');
//const allRecipeCardsBackground = document.querySelector('.allRecipeCards');
//const detailsBackground = document.querySelector('.detailsBackground');


//Event Listeners
window.onload = onStartUp();

allRecipeCards.addEventListener('click', function() {
  addToFavoritesButton(event);
  addToCookbookButton(event);
  displayInstructionsButton(event);
})


//Methods

function onStartUp() {
  apiCalls.getData()
    .then((promise) => {
      //console.log('user data', userData);
      console.log('the promise', promise)
      //user = new User(userData[(Math.floor(Math.random() * userData.length))]);
      user = new User(promise[0]['usersData'][0])
      console.log('user', user)
      globalIngredientsData = promise[1]['ingredientsData'];
      recipeRepository = new RecipeRepository(promise[2]['recipeData'])
      //domUpdates function that populates all recipe cards to the home page

      //domUpdates function that will greet the user by updating the headline
      domUpdates.greetUser(user);
      domUpdates.displayRecipeCards(recipeRepository)
    })
}

function addToFavoritesButton(event) {
  if (event.target.classList.contains('favorite-recipe')) {
    domUpdates.addToFavoriteRecipes(event, recipeRepository, user);
  } else if(!event.target.classList.contains('favorite-recipe')) {
    domUpdates.addToFavoriteRecipes(event, recipeRepository, user)
  }
}

function addToCookbookButton(event) {
  if (event.target.classList.contains('favorite-recipe')) {
    domUpdates.addToCookbook(event, recipeRepository, user);
  } else if(!event.target.classList.contains('favorite-recipe')) {
    domUpdates.addToCookbook(event, recipeRepository, user)
  }
}

function displayInstructionsButton(event) {
  if (event.target.classList.contains('display-instructions')) {
    domUpdates.displayInstructions(event, recipeRepository);
  } else if(!event.target.classList.contains('display-instructions')) {
    domUpdates.displayInstructions(event, recipeRepository);
  }
}

//Function that handles the what happens when a button is clicked
//(Consider having one big if, else conditional rather than multiple functions
//for each button's event listener)



//A function that adds a recipe to the cookbook when the cook button is pressed
// function addRecipeToCookBook(event) {
//   let clickedRecipe = recipeRepository.recipeData.find(recipe => {
//     if (recipe.id === Number(event.target.dataset.id) {
//       return recipe
//     })
//   });
//   return clickedRecipe
// }
//A function that adds a recipe to favorites when the favorite button is pressed


//A function that adds the ingredient name to the ingredient so it can be displayed
//on the details page
function addNameProperty(recipe) {
  let ingredientInfo = recipe.ingredients.map(ingredient => {
    const index = globalIngredientsData.findIndex(specificIngredient => specificIngredient.id === ingredient.id)
    return {
      name: globalIngredientsData[index].name,
      id: ingredient.id,
      quantity: {
        amount: ingredient.quantity.amount, 
        unit: ingredient.quantity.unit
      }
    }
  })
}
