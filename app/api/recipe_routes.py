from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Recipe
from app.forms import RecipeForm
from app import db

recipe_routes = Blueprint('recipes', __name__)

@recipe_routes.route("")
def get_recipe():
  recipes = Recipe.query.all()
  return {"recipes": [recipe.to_dict() for recipe in recipes]}

@recipe_routes.route("/new", methods=["POST"])
def new_recipe():
  form = RecipeForm()


  form['csrf_token'].data = request.cookies['csrf_token']

  print(form.data)

  if form.validate_on_submit():
    recipe = Recipe(
      owner_id=form.data["owner_id"],
      name=form.data["name"],
      ingredient_list=form.data["ingredient_list"],
      description=form.data["description"],
      cover_image=form.data["cover_image"],
      instruction=form.data["instruction"]
    )
    db.session.add(recipe)
    db.session.commit()
    return {'recipe': recipe.to_dict()}
  return {"errors": form.errors}, 400

@recipe_routes.route("/<int:id>", methods=["DELETE"])
def delete_recipe(id):
  recipe = Recipe.query.get(id)
  db.session.delete(recipe)
  db.session.commit()
  return {"message": "post deleted"}
