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

  const reviewsArray = recipe.rating;
  console.log(reviewsArray);
  let ratings = [];
  reviewsArray.forEach((obj) => ratings.push(obj.star_rating));
  console.log("array", ratings.length);

  const starRating2 = (array) => {
    if ((array.length = 0)) return 0;
    else return array.reduce((acc, curr) => acc + curr, 0);
  };

  const starRating = (reviewsArray) => {
    let returnArray = [];
    reviewsArray.forEach((obj) => returnArray.push(obj.star_rating));
    console.log(returnArray, "From Function");
    let finalRating = returnArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    console.log(finalRating, "Final Rating from function");
    if (finalRating == 0) return "No Reviews";
    return finalRating / returnArray.length;
  };

  starRating(reviewsArray);

  return (
    <>
      <div className="rc-container">
        <img
          className="rc-image"
          onClick={redirect}
          src={recipe.cover_image}
        ></img>
        <div className="rc-bottom">
          <div>
            <div className="rc-name">{recipe.name}</div>
            <div className="rc-chef">
              {recipe.owner_name.firstName} {recipe.owner_name.lastName}
            </div>
          </div>
          <div className="rc-rating">
            Rating {starRating(recipe.rating)}
            <div>
              {userCheck(user, recipe.owner_id) && (
                <button className="rc-update" onClick={UpdateRecipe}>
                  Update
                </button>
              )}
              {userCheck(user, recipe.owner_id) && (
                <button className="rc-update" onClick={DeleteRecipe}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
