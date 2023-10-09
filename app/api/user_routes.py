from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User
from app.models import Recipe
from app import db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/favorite/new', methods=["POST"])
@login_required
def add_favorite():
    data = request.json
    user = User.query.get(data["userId"])
    recipe = Recipe.query.get(data["recipeId"])
    user.favorites.append(recipe)
    db.session.commit()
    # print(user.to_dict())
    # return {"favorites": [recipe.to_dict_short() for recipe in user.favorites]}
    return user.to_dict()

@user_routes.route('/favorite/delete', methods=["DELETE"])
@login_required
def delete_favorite():
    data = request.json
    # print("IN THE DELETE ROUTE")
    user = User.query.get(data["userId"])
    recipe = Recipe.query.get(data["recipeId"])
    user.favorites.remove(recipe)
    db.session.commit()
    # return {"favorites": [recipe.to_dict_short() for recipe in user.favorites]}
    return user.to_dict()
