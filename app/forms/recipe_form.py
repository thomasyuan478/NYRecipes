from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Recipe

class RecipeForm(FlaskForm):
  owner_id = IntegerField("owner_id", validators=[DataRequired()])
  name = StringField("name", validators=[DataRequired()])
  ingredient_list = StringField("ingredient_list", validators=[DataRequired()])
  description = StringField("description", validators=[DataRequired()])
  cover_image = StringField("cover_image", validators=[DataRequired()])
  instruction = StringField("instruction", validators=[DataRequired()])
