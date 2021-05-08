
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo


# Flask set up 
app = Flask(__name__)

# Mongo set up 
mongo = PyMongo(app, uri="mongodb://localhost:27017/houses")

# Route that will trigger the scrape function
@app.route("/")
def index():

    # Redirect back to home page
    return render_template('index.html')

# Route to render index.html 
# @app.route("map")
# def map():

#     # Find one record from the mongo database
#     house_record = mongo.db.collection.houses()

#     # Return template and data
#     return render_template("index.html", house_chart=houses)

if __name__ == "__main__":
    app.run(debug=True)
