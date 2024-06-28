from datetime import datetime
from flask import Flask, session, request, jsonify, abort
from config import ApplicationConfig
from models import Problem, ReviewDate, db, User
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session

# Set up app
app = Flask(__name__)
app.config.from_object(ApplicationConfig)
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)
server_session = Session(app)
db.init_app(app)


@app.route("/get-problems/<string:username>") # Get problem list
def get_problems(username):
    # Get user by username
    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"error": "User not found"}), 404

    # Get all problems associated with the user
    all_problems = user.problem_list

    # Jsonify all problems and return to client
    json_all_problems = list(map(lambda x:x.to_json(), all_problems))
    return jsonify({"allProblems": json_all_problems, "username": username})

@app.route("/review-today") # Get problems to review today
def get_review_problems():
    user = User.query.filter_by(id=session.get("user_id")).first()
    all_problems = user.problem_list

    today = datetime.now().date()

    # Query to get all problems with a review date of today owned by the current user
    problems_today = db.session.query(Problem).join(ReviewDate).filter(
        ReviewDate.review_date == today,
        Problem.owner == user.username
    ).all()

    # Jsonify all problems and return to client
    json_problems_today = list(map(lambda x:x.to_json(), problems_today))
    return jsonify({"todayProblems": json_problems_today})


    # # Get problems that have a review date today
    # current_date = datetime.now().date()
    # review_today = ReviewDate.query.filter_by(review_date=current_date)
    # json_review_today = list(map(lambda x:x.to_json(), review_today))

    # # Get the problem id's for each review date, add problem to list
    # review_problems = []
    # for review in json_review_today:
    #     today_problem = Problem.query.get(review["problem_id"])
    #     review_problems.append(today_problem.to_json())

    # return jsonify({"reviewProblems": review_problems})

# CRUD routes for Users
@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")
    if not user_id: 
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "username": user.username
    }), 200

@app.route("/register", methods=["POST"])
def register_user():
    username = request.json["username"]
    password = request.json["password"]

    user_exists = User.query.filter_by(username=username).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Make sure we know who is the current user
    session["user_id"] = new_user.id
    
    return jsonify({
        "id": new_user.id,
        "username": new_user.username
    }), 201

@app.route("/login", methods=["POST"])
def login_user():
    username = request.json["username"]
    password = request.json["password"]

    user = User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"error": "User does not exist"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid password"}), 401
    
    # Make sure we know who is the current user
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "username": user.username
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

# CRUD routes for Problems
@app.route("/create/<string:username>", methods=["POST"])
def create(username):
    problem_name = request.json["problemName"]
    url = request.json["url"]
    owner = username

    # Check if problem already exists
    problem_exists = Problem.query.filter_by(problem_name=problem_name).first() is not None
    if problem_exists:
        return jsonify({"error": "Problem already exists."}), 409

    # Add new problem
    new_problem = Problem(problem_name=problem_name, url=url, owner=owner)
    db.session.add(new_problem)
    db.session.commit()
    return jsonify({
        "problemName": problem_name,
        "url": url,
        "date": new_problem.date,
        "owner": owner
    }), 201

@app.route("/update/<string:id>", methods=["POST"])
def update(id):
    current_problem = Problem.query.get(id)
    current_problem.problem_name = request.json["problemName"]
    current_problem.url = request.json["url"]
    db.session.commit()
    return jsonify({
        "problemName": current_problem.problem_name,
        "url": current_problem.url
    }), 201

@app.route("/delete/<string:id>", methods=["DELETE"])
def delete(id):
    problem_to_delete = Problem.query.get(id)
    db.session.delete(problem_to_delete)
    db.session.commit()
    return jsonify({"success": "Problem has been deleted."})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)