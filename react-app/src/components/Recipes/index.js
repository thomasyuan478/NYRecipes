import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesThunk } from "../../store/recipe";
import { RecipeCard } from "../RecipeCard";

export const Recipes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipesThunk());
  }, [dispatch]);

  const recipes = useSelector((state) => state.recipes);
  const smallRecipes = recipes.recipes;

  const ids = Object.keys(smallRecipes);

  return (
    <>
      <h1>Hello There</h1>
      {ids.map((id) => (
        <div>
          <RecipeCard key={id} recipe={smallRecipes[id]} />
        </div>
      ))}
    </>
  );
};
