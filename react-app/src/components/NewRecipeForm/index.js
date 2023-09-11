import { useState } from "react";
import { useDispatch } from "react-redux";
import { postRecipeThunk } from "../../store/recipe";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const NewRecipeForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [coverImage, setCoverImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientList, setIngredientList] = useState("");
  const [instruction, setInstruction] = useState("");
  const [name, setName] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const formReset = () => {
    setCoverImage("");
    setDescription("");
    setIngredientList("");
    setInstruction("");
    setName("");
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

    dispatch(postRecipeThunk(recipe))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setValidationErrors(data.errors);
          console.log(data);
        }
      })
      .then((res) => {
        if (res) history.push(`/`);
      });
    console.log(recipe);
    // formReset();
  };

  return (
    <>
      <h3>New Recipe</h3>
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
