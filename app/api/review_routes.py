from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Recipe, Review
from app.forms import RecipeForm, ReviewForm
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

@review_routes.route("/<int:id>", methods=["PUT"])
def update_review(id):
  form = ReviewForm()

  review = Review.query.get(id)

  form['csrf_token'].data = request.cookies['csrf_token']

  recipe = Recipe.query.get(review.recipe_id)


  if not review:
    return {"error": "Review could not be found"}

  if form.validate_on_submit():
    print(form.data)
    review.comment = form.data["comment"]
    review.star_rating = form.data["star_rating"]
    db.session.commit()
    return {"recipe": recipe.to_dict_detailed()}

  else:
    return {"error": "something went wrong"}
