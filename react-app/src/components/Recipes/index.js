import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesThunk } from "../../store/recipe";
import { RecipeCard } from "../RecipeCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Recipes.css";
import FeaturedRecipe from "../FeaturedRecipe";

export const Recipes = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getRecipesThunk());
  }, [dispatch]);

  const recipes = useSelector((state) => state.recipes);
  const smallRecipes = recipes.recipes;

  const ids = Object.keys(smallRecipes);

  const sessionUser = useSelector((state) => state.session.user);

  // let featuredRecipe =
  //   smallRecipes[Math.random(Object.keys(smallRecipes).length)];

  return (
    <>
      <div className="page">
        <FeaturedRecipe recipes={smallRecipes} />
        <h1>Latest Recipes</h1>
        {sessionUser && (
          <button className="r-newrecipe" onClick={(e) => history.push("/new")}>
            Click here if you would like to add a recipe!
          </button>
        )}
        <div className="recipes-list">
          {ids.map((id) => (
            <div>
              <RecipeCard key={id} recipe={smallRecipes[id]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
