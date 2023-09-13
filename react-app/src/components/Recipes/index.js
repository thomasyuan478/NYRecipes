import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesThunk } from "../../store/recipe";
import { RecipeCard } from "../RecipeCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Recipes = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getRecipesThunk());
  }, [dispatch]);

  const recipes = useSelector((state) => state.recipes);
  const smallRecipes = recipes.recipes;

  const ids = Object.keys(smallRecipes);

  return (
    <>
      <h1>Recipes Page</h1>
      <button onClick={(e) => history.push("/new")}>
        Click here if you would like to add a recipe
      </button>
      {ids.map((id) => (
        <div>
          <RecipeCard key={id} recipe={smallRecipes[id]} />
        </div>
      ))}
    </>
  );
};
