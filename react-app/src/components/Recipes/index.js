import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesThunk } from "../../store/recipe";
import { RecipeCard } from "../RecipeCard";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Recipes.css";
import AlternateFeaturedRecipe from "../AlternativeFeaturedRecipe";

export const Recipes = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const recipes = useSelector((state) => state.recipes);
  const smallRecipes = recipes.recipes;

  const ids = Object.keys(smallRecipes);

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getRecipesThunk());
  }, [dispatch]);

  // let featuredRecipe =
  //   smallRecipes[Math.random(Object.keys(smallRecipes).length)];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let index = getRandomInt(Object.keys(smallRecipes).length);

  let featured = smallRecipes[index];

  return (
    <>
      <div className="page">
        <AlternateFeaturedRecipe recipe={featured} />
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
