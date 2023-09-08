//TYPES
const CREATE_RECIPE = "POST /api/recipes/new";
const GET_RECIPES = "GET /api/recipes";

//ACTION CREATORS

export function createRecipe(recipe) {
  return {
    type: CREATE_RECIPE,
    recipe,
  };
}

export function loadRecipes(recipes) {
  return {
    type: GET_RECIPES,
    recipes,
  };
}

//THUNKS
export const postRecipeThunk = (recipe) => async (dispatch) => {
  const response = await fetch("/api/recipes/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createRecipe(data.recipe));
    return null;
  } else return { error: "an error has occured" };
};

export const getRecipesThunk = () => async (dispatch) => {
  const response = await fetch("/api/recipes");

  if (response.ok) {
    const recipes = await response.json();
    dispatch(loadRecipes(recipes));
  }
};

//Reducer
const initialState = {
  recipes: {},
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RECIPE: {
      const newState = { ...state };
      newState.recipes[action.recipe.id] = action.recipe;
      return newState;
    }
    case GET_RECIPES: {
      const recipesArray = action.recipes.recipes;
      let newState = { ...state };
      recipesArray.forEach((recipe) => (newState.recipes[recipe.id] = recipe));
      return newState;
    }
    default:
      return state;
  }
};

export default recipesReducer;
