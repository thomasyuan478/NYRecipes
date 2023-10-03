from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Recipe
from app.api.helper import ALLOWED_EXTENSIONS

class RecipeForm(FlaskForm):
  owner_id = IntegerField("owner_id", validators=[DataRequired()])
  name = StringField("name", validators=[DataRequired()])
  ingredient_list = StringField("ingredient_list", validators=[DataRequired(), Length(min=20, max=1000)])
  description = StringField("description", validators=[DataRequired(), Length(min=20, max=1000)])
  image = FileField("image_file", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  instruction = StringField("instruction", validators=[DataRequired(), Length(min=20, max=1000)])
