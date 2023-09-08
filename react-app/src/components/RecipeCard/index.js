export const RecipeCard = ({ recipe }) => {
  return (
    <>
      <div>
        <img src={recipe.cover_image}></img>
        <div>{recipe.name}</div>
        <div>{recipe.ingredient_list}</div>
        <div>{recipe.description}</div>
        <div>{recipe.instruction}</div>
      </div>
    </>
  );
};
