
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo


# Flask set up 
app = Flask(__name__)

# Mongo set up 
mongo = PyMongo(app, uri="mongodb://localhost:27017/houses")

# # Route that will trigger the scrape function
# @app.route("/")
# def scrape():

#     # Run the scrape function
#     mars_data = mars_scrape.scrape()

#     # Update the Mongo database using update and upsert=True
#     mongo.db.collection.update({}, mars_data, upsert=True)

#     # Redirect back to home page
#     return redirect("/")

# # Route to render index.html 
# @app.route("/")
# def home():

#     # Find one record from the mongo database
#     mars_record = mongo.db.collection.find_one()

#     # Return template and data
#     return render_template("index.html", mars_record=mars_record)

if __name__ == "__main__":
    app.run(debug=True)
