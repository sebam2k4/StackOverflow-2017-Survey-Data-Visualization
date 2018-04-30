#!python2

# Flask server

import os
from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

# Info for local connection to MongoDB
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('DBS_NAME', 'dashboard_data')
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
    A Flask view to serve projected data from MongoDB in JSON format
    """
    # A constant that defines the record fields that we wish to retrieve
    # Need to explicitly exclude '_id' field as it it automatically included in the retured documents
    FIELDS = {
        '_id': False, 'Professional': True, 'Country': True,
        'EmploymentStatus': True, 'FormalEducation': True, 'MajorUndergrad': True,
        'YearsProgram': True, 'DeveloperType': True, 'EducationTypes': True,
        'HaveWorkedLanguage': True, 'HaveWorkedFramework': True, 'HaveWorkedDatabase': True,
        'TabsSpaces': True
    }

    # Open a connection to MongoDB using a 'with' statement such that the
    # connection will be closed as soon as we exit the 'with' statement
    with MongoClient(MONGODB_URI) as connection:
        # Define which collection we wish to access
        collection = connection[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        projects = collection.find(projection=FIELDS, limit=55000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))

if __name__ == '__main__':
    app.run()
