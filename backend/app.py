#UPDATE THIS FILE FOR DEPLOYMENT

from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  #Do not consume resoruces or modifiactions that sqlalchemy does

db = SQLAlchemy(app)
migrate = Migrate(app, db)

frontend_folder = os.path.join(os.getcwd(),"..","frontend") #Previous call the operatin system module and enter to the frontend folder
dist_folder = os.path.join(frontend_folder,"dist") #After entering to the frontend folder go to the dist folder

#Server static files from the "dist" folder under the frontend directory (react app)
#Route to get static files files from the dist folder, if we visit the homepage, we will get the index.html
@app.route("/", defaults={"filename": "index.html"})
@app.route("/<path:filename>")
def index(filename):
    return send_from_directory(dist_folder, filename)


#api routes
import routes

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run (debug=True)