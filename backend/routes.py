from app import app, db
from flask import request, jsonify
from models import Friend


#Get all friends
@app.route("/api/frineds", methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    result =  [friend.serialize() for friend in friends]
    return jsonify(result), 200