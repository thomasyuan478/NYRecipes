import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipesThunk } from "../../store/recipe";
import { useSelector } from "react-redux";
import { RecipeCard } from "../RecipeCard";
import "./UserDetails.css";

export const UserDetails = () => {
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes);
  const user = useSelector((state) => state.session.user);
  const favorites = user.favorites;
  const smallRecipes = recipes.recipes;

  useEffect(() => {
    dispatch(getRecipesThunk());
  }, []);

  const ownedrecipes = [];
  const smallRecipesKeys = Object.keys(smallRecipes);
  smallRecipesKeys.forEach((key) => {
    if (smallRecipes[key].owner_id == user.id) ownedrecipes.push(key);
  });

  const favoritesArray = [];
  const favoritekeys = Object.values(favorites);
  favoritekeys.forEach((obj) => favoritesArray.push(String(obj.id)));

  // console.log("favoritesArray", favoritesArray);
  // console.log("SRKeys", smallRecipesKeys);
  // console.log("favoritekeys", favoritekeys);
  // console.log(Object.keys(smallRecipes).length);

  return (
    <>
      <div className="page">
        <h1>My Recipes</h1>
        <div className="ud-container">
          {ownedrecipes.map((key) => (
            <RecipeCard recipe={smallRecipes[key]} />
          ))}
        </div>
        <h1>Favorite Recipes</h1>
        <div>
          {Object.keys(smallRecipes).length &&
            favoritesArray.map((key) => (
              <RecipeCard recipe={smallRecipes[key]} />
            ))}
        </div>
      </div>
    </>
  );
};
