from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def add_reviews():
  oneOne = Review(
    user_id=1,
    recipe_id=1,
    star_rating=4,
    comment="I ENJOY EATING STUFF"
  )
  oneTwo = Review(
    user_id=1,
    recipe_id=2,
    star_rating=3,
    comment="CAN YOU BELIEVE IT "
  )
  oneThree = Review(
    user_id=1,
    recipe_id=3,
    star_rating=5,
    comment="I am some text! - README.MD"
  )
  twoOne = Review(
    user_id=2,
    recipe_id=1,
    star_rating=3,
    comment="Could've been worse"
  )
  twoTwo = Review(
    user_id=2,
    recipe_id=2,
    star_rating=5,
    comment="Badabing badaboom I am a review. Nice Recipe"
  )
  twoThree = Review(
    user_id=2,
    recipe_id=3,
    star_rating=4,
    comment="I really enjoy food. This is good"
  )
  threeOne = Review(
    user_id=3,
    recipe_id=1,
    star_rating=3,
    comment="Yea, was alright"
  )
  threeTwo = Review(
    user_id=3,
    recipe_id=2,
    star_rating=1,
    comment="We'll I didn't have any of the basic ingredients so I put some jam on the toast, not sure why anyone would eat this."
  )
  threeThree = Review(
    user_id=3,
    recipe_id=3,
    star_rating=5,
    comment="SUPER DELICIOUS, CAN'T WAIT TO TRY MORE"
  )
  db.session.add(oneOne)
  db.session.add(oneTwo)
  db.session.add(oneThree)
  db.session.add(twoOne)
  db.session.add(twoTwo)
  db.session.add(twoThree)
  db.session.add(threeOne)
  db.session.add(threeTwo)
  db.session.add(threeThree)
  db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
