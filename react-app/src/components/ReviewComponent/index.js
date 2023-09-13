import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/recipe";
import { useState } from "react";

export const ReviewComponent = ({ review }) => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);

  const deleteButton = (e) => {
    console.log(review.id);
    dispatch(deleteReviewThunk(review.id));
  };

  const toggleUpdate = () => {
    setUpdate(true);
    if (update === true) setUpdate(false);
  };

  return (
    <>
      <div>
        <div>
          {update && <textarea value={review.comment}></textarea>}
          {!update && review.comment} RATING - {review.star_rating}
        </div>
        <div>
          {review.user.firstName} {review.user.lastName} // ReviewId-#
          {review.id}
        </div>
        {!update && <button onClick={toggleUpdate}> Future Update </button>}
        {update && <button onClick={toggleUpdate}> Future Cancel </button>}
        <button onClick={deleteButton}> Delete </button>
      </div>
    </>
  );
};
