import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/recipe";

export const ReviewComponent = ({ review }) => {
  const dispatch = useDispatch();

  const deleteButton = (e) => {
    console.log(review.id);
    dispatch(deleteReviewThunk(review.id));
  };

  return (
    <>
      <div>
        <div>
          {review.comment} RATING - {review.star_rating}
        </div>
        <div>
          {review.user.firstName} {review.user.lastName} // ReviewId-#
          {review.id}
        </div>
        <button> Future Update </button>
        <button onClick={deleteButton}> Future Delete </button>
      </div>
    </>
  );
};
