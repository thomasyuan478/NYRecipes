from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Recipe, Review
from app.forms import RecipeForm
from app import db

review_routes = Blueprint("reviews", __name__)

@review_routes.route("/<int:id>", methods=["DELETE"])
def delete_review(id):
  review = Review.query.get(id)

  if review:
    recipe = Recipe.query.get(review.recipe_id)
    db.session.delete(review)
    db.session.commit()
    return {"recipe": recipe.to_dict_detailed()}

  else:
    return {"error": "Review could not be found"}
