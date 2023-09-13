from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
  star_rating = IntegerField("star_rating", validators=[DataRequired()])
  comment = StringField("name", validators=[DataRequired()])
  user_id = IntegerField("user_id", validators=[DataRequired()])
  recipe_id = IntegerField("user_id", validators=[DataRequired()])
