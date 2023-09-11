//TYPES
const CREATE_RECIPE = "POST /api/recipes/new";
const GET_RECIPES = "GET /api/recipes";
const DELETE_RECIPE = "DELETE /api/recipes";
const GET_RECIPE_DETAIL = "GET /api/recipes/:recipeId";
const UPDATE_RECIPE = "PUT /api/recipes/:recipeId";

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

export function deleteRecipe(recipeId) {
  return {
    type: DELETE_RECIPE,
    recipeId,
  };
}

export function loadSingleRecipe(recipe) {
  return {
    type: GET_RECIPE_DETAIL,
    recipe,
  };
}

export function updateRecipe(recipe, recipeId) {
  return {
    type: UPDATE_RECIPE,
    recipe,
    recipeId,
  };
}

//THUNKS
export const postRecipeThunk = (recipe) => async (dispatch) => {
  console.log("FROM THUNK", recipe);
  const response = await fetch("/api/recipes/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createRecipe(data.recipe));
    return data;
  } else {
    const data = await response.json();
    return data;
  }
};

export const updateRecipeThunk = (recipe, recipeId) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${recipeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateRecipe(data.recipe, recipeId));
    return data;
  } else {
    const data = await response.json();
    return data;
  }
};

export const getSingleRecipeThunk = (recipeId) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${recipeId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSingleRecipe(data.recipe));
    return data;
  }
};

export const getRecipesThunk = () => async (dispatch) => {
  const response = await fetch("/api/recipes");

  if (response.ok) {
    const recipes = await response.json();
    dispatch(loadRecipes(recipes));
  }
};

export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${recipeId}`, {
    method: "DELETE",
  });
  dispatch(deleteRecipe(recipeId));
};

//Reducer
const initialState = {
  recipes: {},
  singleRecipe: {},
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPE_DETAIL: {
      const newState = { ...state };
      newState.singleRecipe = action.recipe;
      return newState;
    }
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
    case UPDATE_RECIPE: {
      let newState = { ...state };
      newState.singleRecipe = action.recipe;
      return newState;
    }
    case DELETE_RECIPE: {
      let newState = { ...state };
      delete newState.recipes[action.recipeId];
      return newState;
    }
    default:
      return state;
  }
};

export default recipesReducer;
