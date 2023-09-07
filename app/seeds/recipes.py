from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def add_recipes():
  one = Recipe(
    owner_id=1,
    name="Galbi and Tteok Skewers",
    ingredient_list="Asian Pear, soysauce, yellow onion, dark brown sugar, orange juice",
    description="Salty, tangy and supremely textural, David Shim dish!",
    cover_image="https://static01.nyt.com/images/2023/09/01/multimedia/AW-galbi-and-rice-cake-skewers-gtcz/AW-galbi-and-rice-cake-skewers-gtcz-master768.jpg?w=1280&q=75",
    instruction="Step 1 -> Step 7, Enjoy food"
  )
  two = Recipe(
    owner_id=2,
    name="Cold Sesame Noodles With Cucumber, Corn and Basil",
    ingredient_list="""Salt
10ounces dried thick rice or wheat noodles
4Persian cucumbers (about 11 ounces)
¼cup Chinese or Japanese sesame paste or tahini
4teaspoons toasted sesame oil
4 to 6teaspoons chile crisp (to your taste), plus more for serving
2ears corn, kernels removed (about 2 cups of kernels)
Toasted white sesame seeds, to serve
Handful of basil leaves""",
    description="For a summertime update on a beloved Chinese dish, cold sesame noodles are freshened up with crisp cucumbers, raw corn and aromatic basi",
    cover_image="https://static01.nyt.com/images/2023/08/23/multimedia/hm-cold-sesame-noodles-ckwq/hm-cold-sesame-noodles-ckwq-articleLarge.jpg?w=1280&q=75",
    instruction="Step 1 -> Step 7, Enjoy food"
  )
  three = Recipe(
    owner_id=3,
    name="Roasted Honey Nut Squash and Chickpeas With Hot Honey",
    ingredient_list="""2(14.5-ounce) cans chickpeas (preferably not “no salt added”), drained and rinsed
2½pounds honey nut or butternut squash, peeled, trimmed, seeded and cut into 1-inch cubes (6 cups)
1¾teaspoons baharat, garam masala or another spice blend
1¼teaspoons fine salt, plus more as needed
5thyme sprigs
⅛teaspoon red-pepper flakes
3tablespoons extra-virgin olive oil, plus more as needed
1small red onion, thinly sliced
1teaspoon cider vinegar or rice wine vinegar, plus more as needed
½cup fresh cilantro leaves or dill sprigs, or a combination
1 to 2tablespoons hot honey, plus more to taste
Plain whole-milk yogurt or sour cream, for serving (optional)""",
    description="Colorful and meatless, sweet and fiery, this sheet-pan dinner is an exuberant combination of cold-weather vegetables and warming spices that will perk up any weeknight",
    cover_image="https://static01.nyt.com/images/2022/01/28/multimedia/28apperex-1-9164/28apperex-1-9164-articleLarge.jpg?w=1280&q=75",
    instruction="Step 1 -> Step 7, Enjoy food"
  )


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()
