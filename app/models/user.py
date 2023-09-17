from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profilePic = db.Column(db.String(255))
    biography = db.Column(db.Text())
    hashed_password = db.Column(db.String(255), nullable=False)

    #Relationships
    recipes = db.relationship("Recipe", back_populates="user", cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="user")
    favorites = db.relationship(
        "Recipe",
        secondary="favorites",
        back_populates="user_favorites"
    )



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email
        }

    def to_dict_info(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
        }
