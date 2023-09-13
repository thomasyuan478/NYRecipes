import { ReviewComponent } from "../ReviewComponent";
import { useState } from "react";
import "./ReviewContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { addReviewThunk } from "../../store/recipe";

export const ReviewContainer = ({ reviews, recipeId }) => {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const user = useSelector((state) => state.session.user);


  if (reviews?.length == 0) return null;

  const clearForm = () => {
    setReviewText("");
    setReviewRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      comment: reviewText,
      star_rating: reviewRating,
      recipe_id: recipeId,
      user_id: 1,
    };
    // console.log(review);
    dispatch(addReviewThunk(review));
    clearForm();
  };

  return (
    <>
      <h1>Hello From Reviews Component Recipe: {recipeId}</h1>
      <div className="reviews-container">
        <div>
          <form onSubmit={handleSubmit}>
            <label>Review</label>
            <div>
              <textarea
                placeholder="Write your review here"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              ></textarea>
              <div>
                <label>Rating</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={reviewRating}
                  onChange={(e) => setReviewRating(e.target.value)}
                ></input>
              </div>
            </div>
            <button disabled={!user}>Add Review</button>
            {!user && <p>You must be signed in to write a review</p>}
          </form>
        </div>
        <div>
          <div>Reviews Container</div>
          {reviews?.map((reviewObj) => (
            <ReviewComponent review={reviewObj} />
          ))}
        </div>
      </div>
    </>
  );
};
