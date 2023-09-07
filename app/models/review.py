from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
  __tablename__ = "reviews"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))
  star_rating = db.Column(db.Integer)
  comment = db.Column(db.String(255))

  #Relationships
  user = db.relationship("User", back_populates="reviews")
  recipe = db.relationship("Recipe", back_populates="reviews")

  def to_dict(self):
    return{
      'id': self.id,
      'user': self.user.to_dict(),
      'recipe': self.recipe.to_dict(),
      'star_rating': self.star_rating,
      'comment': self.comment
    }
