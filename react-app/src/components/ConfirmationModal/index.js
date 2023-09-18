import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { deleteRecipeThunk } from "../../store/recipe";
import { deleteReviewThunk } from "../../store/recipe";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ recipeId, reviewId, review }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const deleteRecipe = (e) => {
    dispatch(deleteRecipeThunk(recipeId))
      .then(closeModal())
      .then((res) => {
        history.push("/");
      });
  };

  const deleteReview = (e) => {
    dispatch(deleteReviewThunk(reviewId))
      .then(closeModal())
      .then((res) => {
        history.push(`/recipes/${review.recipe.id}`);
      });
  };

  const cancel = (e) => {
    closeModal();
  };

  return (
    <>
      <h1 className="cm-title">Confirm Delete</h1>
      {recipeId && (
        <>
          <p className="cm-text">
            Are you sure you want to delete this recipe?
          </p>
          <div className="cm-buttoncontainer">
            <button className="cm-b yes" onClick={deleteRecipe}>
              Yes
            </button>
            <button className="cm-b no" onClick={cancel}>
              No
            </button>
          </div>
        </>
      )}
      {reviewId && (
        <>
          <p className="cm-text">
            Are you sure you want to delete this review?
          </p>
          <div className="cm-buttoncontainer">
            <button className="cm-b yes" onClick={deleteReview}>
              Yes
            </button>
            <button className="cm-b no" onClick={cancel}>
              No
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ConfirmationModal;
