import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import "./FeaturedRecipe.css";

const AlternateFeaturedRecipe = () => {
  const history = useHistory();

  const recipes = useSelector((state) => state.recipes);
  // const smallRecipes = recipes.recipes;

  // const ids = Object.keys(smallRecipes);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let keysArray = Object.keys(recipes.recipes);
  // console.log(keysArray);
  let index = getRandomInt(Object.keys(keysArray).length);
  let featured = keysArray[index];

  const recipe = recipes.recipes[featured];

  // const recipe = recipes[index];
  // console.log(index, recipe, recipes.recipes);

  // console.log("Index", index);
  // console.log("Recipe", recipe);

  const redirect = () => {
    history.push(`/recipes/${recipe.id}`);
  };

  // console.log(recipe, Object.keys(recipes).length);

  return (
    <>
      <div>
        <h1>Featured Recipe</h1>
        <div className="fr-container">
          <img
            className="fr-image"
            onClick={redirect}
            src={recipe?.cover_image}
          ></img>
          <div className="fr-content">
            <div className="fr-recipename">{recipe?.name}</div>
            <div className="fr-chefname">
              by {recipe?.owner_name.firstName} {recipe?.owner_name.lastName}{" "}
            </div>
            <div className="fr-description">{recipe?.description}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlternateFeaturedRecipe;
