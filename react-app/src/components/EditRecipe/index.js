import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSingleRecipeThunk, postRecipeThunk } from "../../store/recipe";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { updateRecipeThunk } from "../../store/recipe";

export const EditRecipeForm = () => {
  const { recipeId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const state = useSelector((state) => state.recipes.singleRecipe);

  const [coverImage, setCoverImage] = useState(state?.cover_image);
  const [description, setDescription] = useState(state?.description);
  const [ingredientList, setIngredientList] = useState(state?.ingredient_list);
  const [instruction, setInstruction] = useState(state?.instruction);
  const [name, setName] = useState(state?.name);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    dispatch(getSingleRecipeThunk(recipeId)).then((res) => updateForm(res));
  }, [dispatch]);

  const updateForm = (data) => {
    setCoverImage(data.recipe.cover_image);
    setDescription(data.recipe.description);
    setIngredientList(data.recipe.ingredient_list);
    setInstruction(data.recipe.instruction);
    setName(data.recipe.name);
  };

  const submitRecipe = (e) => {
    e.preventDefault();

    const recipe = {
      owner_id: 1,
      cover_image: coverImage,
      ingredient_list: ingredientList,
      description,
      instruction,
      name,
    };

    dispatch(updateRecipeThunk(recipe, recipeId));
    history.push(`/recipes/${recipeId}`);
  };

  return (
    <>
      <h3>Edit Existing Recipe- {state.name}</h3>
      <form onSubmit={submitRecipe}>
        <div>
          <label>Name</label>
          <div>
            <input
              placeholder="Enter the recipes name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required={true}
              type="text"
              id="name"
            ></input>
          </div>
        </div>
        <div>
          <label>Description</label>
          <div>
            <input
              placeholder="Enter the recipes description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
              id="description"
            ></input>
          </div>
        </div>
        <div>
          <label>Instruction</label>
          <div>
            <input
              placeholder="Enter the recipes instructions"
              onChange={(e) => setInstruction(e.target.value)}
              value={instruction}
              required
              id="instruction"
            ></input>
          </div>
        </div>
        <div>
          <label>Cover Image</label>
          <div>
            <input
              placeholder="Enter the recipes image"
              onChange={(e) => setCoverImage(e.target.value)}
              value={coverImage}
              required
              type="url"
              id="cover_image"
            ></input>
          </div>
        </div>
        <div>
          <label>Ingredient List</label>
          <div>
            <input
              placeholder="Enter the recipes ingredients"
              onChange={(e) => setIngredientList(e.target.value)}
              value={ingredientList}
              required
              id="ingredient_list"
            ></input>
          </div>
        </div>
        <div></div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
