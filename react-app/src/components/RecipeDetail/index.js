import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleRecipeThunk } from "../../store/recipe";
import { ReviewContainer } from "../ReviewContainer";
import { deleteRecipeThunk } from "../../store/recipe";
import "./RecipeDetail.css";
import ConfirmationModal from "../ConfirmationModal";
import { addFavoriteThunk, deleteFavoriteThunk } from "../../store/session";
import { useState } from "react";

import OpenModalButton from "../OpenModalButton";

export const RecipeDetail = () => {
  const { recipeId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  // const history = useHistory();
  // const state = useSelector((state) => state.events);
  // const user = useSelector((state) => state.session.user);
  // const group = useSelector((state) => state.groups.singleGroup);
  // const event = useSelector((state) => state.events.SingleEvent);
  // const images = useSelector((state) => state.events.SingleEvent.EventImages);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState();
  const user = useSelector((state) => state.session.user);
  const recipe = useSelector((state) => state.recipes.singleRecipe);

  const DeleteRecipe = (e) => {
    console.log("delete button");
    dispatch(deleteRecipeThunk(recipe.id));
  };

  const UpdateRecipe = (e) => {
    console.log("edit button");
    history.push(`/recipes/${recipe.id}/edit`);
  };

  useEffect(() => {
    dispatch(getSingleRecipeThunk(recipeId));
    setUserId(user.id);
  }, [dispatch]);

  const normalizeFavorites = (sessionUser) => {
    let normalizedFavorites = [];
    let favorites = sessionUser.favorites;
    if (favorites) {
      favorites.forEach((obj) => normalizedFavorites.push(obj.id));
    }
    return normalizedFavorites;
  };

  useEffect(() => {
    setFavorites(normalizeFavorites(user));
  }, [user]);

  const userCheck = (sessionUser, recipeUserId) => {
    if (!sessionUser) return false;
    else if (sessionUser.id != recipeUserId) return false;
    else return true;
  };

  const favoriteCheck = (sessionUser, recipeId) => {
    if (!sessionUser) return false;
    if (favorites.includes(recipeId)) return false;
    else return true;
  };

  const Favorite = () => {
    dispatch(addFavoriteThunk(userId, recipe.id));
  };

  const Unfavorite = () => {
    dispatch(deleteFavoriteThunk(userId, recipe.id));
  };

  const starRating = (reviewsArray) => {
    let returnArray = [];
    reviewsArray.forEach((obj) => returnArray.push(obj.star_rating));
    let finalRating = returnArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    if (finalRating == 0) return "No Reviews";
    return (finalRating / returnArray.length).toFixed(2);
  };

  return (
    <>
      <div className="page">
        <div className="rd-sectioncontainer">
          <div className="rd-leftsection">
            <div className="rd-section1">
              <h1 className="rd-title">{recipe.name}</h1>
              <h2 className="rd-chef">
                by {recipe.owner_name?.firstName} {recipe.owner_name?.lastName}
              </h2>
              <div className="rd-buttoncontainer">
                {userCheck(user, recipe.owner_id) && (
                  <button onClick={UpdateRecipe}>Update</button>
                )}
                {userCheck(user, recipe.owner_id) && (
                  <OpenModalButton
                    buttonText={"Delete"}
                    modalComponent={<ConfirmationModal recipeId={recipe.id} />}
                  />
                )}
                {user && favoriteCheck(user, recipe.id) && (
                  <button onClick={Favorite}>Favorite</button>
                )}
                {user && !favoriteCheck(user, recipe.id) && (
                  <button onClick={Unfavorite}>Unfavorite</button>
                )}
              </div>
            </div>
            <div className="rd-section2">
              <h2>Rating: {recipe.reviews && starRating(recipe.reviews)}</h2>
              {/* <p>Notes</p> */}
            </div>
            <div className="rd-section3">
              <h2>Ingredients</h2>
              {recipe.ingredient_list}
            </div>
          </div>

          <div className="rd-rightsection">
            <div className="rd-section1">
              <img className="rd-image" src={recipe.cover_image}></img>
            </div>
            <div className="rd-section2">
              <p className="rd-description">{recipe.description}</p>
            </div>
            <div className="rd-section3">
              <h2>Preparation</h2>
              {recipe.instruction}
            </div>
          </div>
        </div>
      </div>

      <ReviewContainer reviews={recipe.reviews} recipeId={recipe.id} />
    </>
  );
};
