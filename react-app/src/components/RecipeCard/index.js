import { useDispatch } from "react-redux";
import { deleteRecipeThunk } from "../../store/recipe";

export const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();

  const DeleteRecipe = (e) => {
    console.log("delete button");
    dispatch(deleteRecipeThunk(recipe.id));
  };

  return (
    <>
      <div>
        <img src={recipe.cover_image}></img>
        <div>{recipe.name}</div>
        <div>{recipe.ingredient_list}</div>
        <div>{recipe.description}</div>
        <div>{recipe.instruction}</div>
        <button>Update</button>
        <button onClick={DeleteRecipe}>Delete</button>
      </div>
    </>
  );
};
