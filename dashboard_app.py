#!python2

# Flask server

from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)


# Routes
@app.route("/")
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
