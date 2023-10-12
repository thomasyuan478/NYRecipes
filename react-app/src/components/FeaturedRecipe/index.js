import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
// import "./FeaturedRecipe.css";
import parse from "html-react-parser";

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

  console.log("Index", index);
  console.log("Recipe", recipe);

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
            <div className="fr-description">
              {recipe?.description && parse(recipe.description)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedRecipe;
