import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const FeaturedRecipe = ({ recipes }) => {
  const history = useHistory();

  // const recipes = useSelector((state) => state.recipes);
  // const smallRecipes = recipes.recipes;

  // const ids = Object.keys(smallRecipes);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  let index = getRandomInt(Object.keys(recipes).length);

  const recipe = recipes[index];

  const redirect = () => {
    history.push(`/recipes/${recipe.id}`);
  };

  console.log(recipe, Object.keys(recipes).length);

  return (
    <>
      <h1>Hello from Featured Recipes</h1>
      <div className="fr-container">
        <img
          className="fr-image"
          onClick={redirect}
          src={recipe?.cover_image}
        ></img>
        <div>{recipe?.name}</div>
        <div>{recipe?.ingredient_list}</div>
        <div>{recipe?.description}</div>
        <div>{recipe?.instruction}</div>
      </div>
    </>
  );
};

export default FeaturedRecipe;
