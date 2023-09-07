from .db import db, environment, SCHEMA, add_prefix_for_prod

class Recipe(db.Model):
  __tablename__ = "recipes"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
  name = db.Column(db.String(255), nullable=false)
  ingredient_list = db.Column(db.Text())
  description = db.Column(db.Text())
  cover_image = db.Column(db.String(255), nullable=False)
  instruction = db.Column(db.Text())

  #Relationships
  user = db.relationship("User", back_populates="recipes")
  reviews = db.relationship("Review", back_populates="recipe")
  user_favorites = db.relationship(
    "User",
    secondary="favorites",
    back_populates="favorites")

  def to_dict(self):
    return{
    'id': self.id,
    'owner_id': self.owner_id,
    'name': self.name,
    'ingredient_list': self.ingredient_list,
    'description': self.description,
    'cover_image': self.cover_image,
    'instruction': self.instruction
    }
