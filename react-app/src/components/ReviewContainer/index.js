export const ReviewContainer = ({ reviews }) => {
  console.log(reviews, "FROM REVIEWS COMPONENT");
  if (reviews?.length == 0) return null;
  return (
    <>
      <h1>Hello From Reviews Component</h1>
      <div>
        <div>Reviews Container</div>
        {reviews?.map((reviewObj) => (
          <>
            <div>
              <div>
                {reviewObj.comment} RATING - {reviewObj.star_rating}
              </div>
              <div>
                {reviewObj.user.firstName} {reviewObj.user.lastName}
              </div>
              <button> Future Update </button>
              <button> Future Delete </button>
            </div>
          </>
        ))}
        <button>Add Review</button>
      </div>
    </>
  );
};
