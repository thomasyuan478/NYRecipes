from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Recipe

class RecipeForm(FlaskForm):
  owner_id = IntegerField("owner_id", validators=[DataRequired()])
  name = StringField("name", validators=[DataRequired()])
  ingredient_list = StringField("ingredient_list", validators=[DataRequired(), Length(min=20, max=1000)])
  description = StringField("description", validators=[DataRequired(), Length(min=20, max=1000)])
  cover_image = StringField("cover_image", validators=[DataRequired()])
  instruction = StringField("instruction", validators=[DataRequired(), Length(min=20, max=1000)])
