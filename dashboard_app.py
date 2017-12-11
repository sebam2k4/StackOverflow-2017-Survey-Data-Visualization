#!python2

# Flask server

from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

# Info for local connection to MongoDB
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'dashboard_data'
COLLECTION_NAME = 'stack2017'

# Routes
@app.route("/")
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("index.html")

@app.route("/data")
def stack2017_data():
    """
    A Flask view to serve project data from
    MongoDB in JSON format
    """



    # Open a connection to MongoDB using a 'with' statement such that the
    # connection will be closed as soon as we exit the 'with' statement
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as connection:
        # Define which collection we wish to access
        collection = connection[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the results to 55000. Using projection redeuces network overhead and processing requirements
        # by limiting fields that are returned in t results documents.
        projects = collection.find(projection=FIELDS, limit=55000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))

if __name__ == '__main__':
    app.run(debug=True)
