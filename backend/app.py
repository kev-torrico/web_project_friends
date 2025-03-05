from flask import Flask
from flask_sqalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  #Do not consume resoruces or modifiactions that sqlalchemy does

db = SQLAlchemy(app)

import routes

if __name__ == "__main__":
    app.run (debug=True)