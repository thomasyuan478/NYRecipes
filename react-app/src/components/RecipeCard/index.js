import { useDispatch } from "react-redux";
import { deleteRecipeThunk } from "../../store/recipe";
import { useHistory } from "react-router-dom";

export const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const DeleteRecipe = (e) => {
    console.log("delete button");
    dispatch(deleteRecipeThunk(recipe.id));
  };

  const UpdateRecipe = (e) => {
    console.log("edit button");
    history.push(`/recipes/${recipe.id}/edit`);
  };

  const redirect = (e) => {
    console.log("Detail");
    history.push(`/recipes/${recipe.id}`);
  };

  return (
    <>
      <div>
        <img onClick={redirect} src={recipe.cover_image}></img>
        <div>{recipe.name}</div>
        <div>{recipe.ingredient_list}</div>
        <div>{recipe.description}</div>
        <div>{recipe.instruction}</div>
        <button onClick={UpdateRecipe}>Update</button>
        <button onClick={DeleteRecipe}>Delete</button>
      </div>
    </>
  );
};
