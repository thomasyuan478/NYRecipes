import { useDispatch, useSelector } from "react-redux";
import { deleteRecipeThunk } from "../../store/recipe";
import { useHistory } from "react-router-dom";
import "./RecipeCard.css";

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

  const user = useSelector((state) => state.session.user);

  const userCheck = (sessionUser, recipeOwnerId) => {
    if (!sessionUser) return false;
    else if (sessionUser.id != recipeOwnerId) return false;
    else return true;
  };

  return (
    <>
      <div className="rc-container">
        <img
          className="rc-image"
          onClick={redirect}
          src={recipe.cover_image}
        ></img>
        <div>{recipe.name}</div>
        <div>{recipe.ingredient_list}</div>
        <div>{recipe.description}</div>
        <div>{recipe.instruction}</div>
        {userCheck(user, recipe.owner_id) && (
          <button onClick={UpdateRecipe}>Update</button>
        )}
        {userCheck(user, recipe.owner_id) && (
          <button onClick={DeleteRecipe}>Delete</button>
        )}
      </div>
    </>
  );
};
