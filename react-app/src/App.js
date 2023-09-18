import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { getRecipesThunk } from "./store/recipe";
import { Recipes } from "./components/Recipes";
import { NewRecipeForm } from "./components/NewRecipeForm";
import { RecipeDetail } from "./components/RecipeDetail";
import { EditRecipeForm } from "./components/EditRecipe";
import { NewEditRecipe } from "./components/NewEditRecipe";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // useEffect(() => {
  //   if (isLoaded) dispatch(getRecipesThunk());
  // }, [isLoaded, dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Recipes />
          </Route>
          <Route exact path="/new">
            <NewRecipeForm />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/recipes/:recipeId/edit">
            <NewEditRecipe />
          </Route>
          <Route exact path="/recipes/:recipeId">
            <RecipeDetail />
          </Route>
          <Route>
            <h1>404: Page Not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
