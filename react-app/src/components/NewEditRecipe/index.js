import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { getSingleRecipeThunk, postRecipeThunk } from "../../store/recipe";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateRecipeThunk } from "../../store/recipe";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const NewEditRecipe = () => {
  const { recipeId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [coverImage, setCoverImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientList, setIngredientList] = useState("");
  const [instruction, setInstruction] = useState("");
  const [name, setName] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const user = useSelector((state) => state.session.user);
  const state = useSelector((state) => state.recipes.singleRecipe);

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

  const formReset = () => {
    setCoverImage("");
    setDescription("");
    setIngredientList("");
    setInstruction("");
    setName("");
  };

  const submitRecipe = (e) => {
    e.preventDefault();

    if (
      description.length < 20 ||
      instruction.length < 20 ||
      ingredientList.length < 20
    ) {
      let error = {};
      if (description.length < 20)
        error["description"] =
          "description must be greater than twenty characters";
      if (instruction.length < 20)
        error["instruction"] =
          "instruction must be greater than twenty characters";
      if (ingredientList.length < 20)
        error["ingredientList"] =
          "ingredientList must be greater than twenty characters";
      setValidationErrors(error);
    } else {
      const recipe = {
        owner_id: user.id,
        cover_image: coverImage,
        ingredient_list: ingredientList,
        description,
        instruction,
        name,
      };

      setValidationErrors({});

      dispatch(updateRecipeThunk(recipe, recipeId));
      history.push(`/recipes/${recipeId}`);
      // dispatch(postRecipeThunk(recipe))
      //   .catch(async (res) => {
      //     const data = await res.json();
      //     if (data && data.errors) {
      //       setValidationErrors(data.errors);
      //       console.log(data);
      //     }
      //   })
      //   .then((res) => {
      //     if (res) history.push(`/`);
      //   });
      // console.log(recipe);
      // formReset();
    }
  };

  if (state.owner_id != user.id) {
    history.push("/");
  }

  return (
    <>
      <div className="page">
        <h3>Edit Recipe</h3>
        <form onSubmit={submitRecipe}>
          <div>
            <label>Name</label>
            <div>
              <textarea
                placeholder="Enter the recipes name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                cols={"50"}
                rows={"3"}
                required={true}
                type="text"
                id="name"
              ></textarea>
            </div>
          </div>
          <div>
            <label>Description</label>
            <div>
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
                data={description}
                required
                id="ingredient_list"
              />
              {/* <textarea
                placeholder="Enter the recipes description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                cols={"50"}
                rows={"5"}
                required
                id="description"
              ></textarea> */}
              {validationErrors.description && (
                <p className="error">
                  {validationErrors.description} Characters:
                  {description.length}
                </p>
              )}
            </div>
          </div>
          <div>
            <label>Instructions</label>
            <div>
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setInstruction(data);
                  // console.log(data);
                }}
                data={instruction}
                required
                id="ingredient_list"
              />
              {/* <textarea
                placeholder="Enter the recipes instructions"
                onChange={(e) => setInstruction(e.target.value)}
                value={instruction}
                cols={"50"}
                rows={"10"}
                required
                id="instruction"
              ></textarea> */}
              {validationErrors.instruction && (
                <p className="error">
                  {validationErrors.instruction} Characters:
                  {instruction.length}
                </p>
              )}
            </div>
          </div>
          <div>
            <label>Cover Image</label>
            <div>
              <input
                className="nrf-input"
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
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setIngredientList(data);
                  // console.log(data);
                }}
                data={ingredientList}
                required
                id="ingredient_list"
              />
              {/* <textarea
                placeholder="Enter the recipes ingredients"
                onChange={(e) => setIngredientList(e.target.value)}
                value={ingredientList}
                cols={"50"}
                rows={"10"}
                required
                id="ingredient_list"
              ></textarea> */}
              {validationErrors.ingredientList && (
                <p className="error">
                  {validationErrors.ingredientList} Characters:
                  {ingredientList.length}
                </p>
              )}
            </div>
          </div>
          <div></div>
          <button className="ar-b" disabled={!user} type="submit">
            Submit
          </button>
          {!user && <p>You must be signed in to create a new recipe</p>}
        </form>
      </div>
    </>
  );
};
