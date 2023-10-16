import { useDispatch, useSelector } from "react-redux";
import { deleteReviewThunk } from "../../store/recipe";
import { useState } from "react";
import { updateReviewThunk } from "../../store/recipe";
import "./ReviewComponent.css";
import ConfirmationModal from "../ConfirmationModal";
import OpenModalButton from "../OpenModalButton";

export const ReviewComponent = ({ review }) => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [newComment, setNewComment] = useState(review.comment);
  const [newRating, setNewRating] = useState(review.star_rating);
  const id = review.id;

  const user = useSelector((state) => state.session.user);

  const deleteButton = (e) => {
    // console.log(review.id);
    dispatch(deleteReviewThunk(review.id));
  };

  const toggleUpdate = () => {
    setUpdate(true);

    if (update === true) {
      setUpdate(false);
      setNewComment(review.comment);
      setNewRating(review.star_rating);
    }
  };

  const submitUpdate = (e) => {
    e.preventDefault();

    if (review.comment === newComment && review.star_rating === newRating)
      return null;
    else {
      const updateReview = {
        id: id,
        comment: newComment,
        star_rating: newRating,
        recipe_id: review.recipe.id,
        user_id: user.id,
      };

      dispatch(updateReviewThunk(updateReview));
      setUpdate(false);
      review.comment = newComment;
    }
  };

  const userCheck = (sessionUser, user_id) => {
    if (!sessionUser) return false;
    else if (sessionUser.id != user_id) return false;
    else return true;
  };

  return (
    <>
      <div className="individual-review">
        <div className="rc-content">
          <div>
            {review.user.firstName} {review.user.lastName}
          </div>
          <div>
            {update && (
              <form>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  cols={"50"}
                  rows={"10"}
                  minLength={"10"}
                  maxLength={"255"}
                  required
                ></textarea>
                <div>
                  <label>Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    required
                    value={newRating}
                    onChange={(e) => setNewRating(e.target.value)}
                  ></input>
                </div>
                <div>
                  <button onClick={submitUpdate}>Submit </button>
                </div>
              </form>
            )}
            {!update && review.comment}
          </div>
          <div> {review.star_rating} // 5</div>
          {!update && userCheck(user, review.user.id) && (
            <button onClick={toggleUpdate}> Update </button>
          )}
          {update && userCheck(user, review.user.id) && (
            <button onClick={toggleUpdate}> Cancel </button>
          )}
          {userCheck(user, review.user.id) && (
            <OpenModalButton
              buttonText={"Delete"}
              modalComponent={
                <ConfirmationModal reviewId={review.id} review={review} />
              }
            />
          )}
        </div>
      </div>
    </>
  );
};
