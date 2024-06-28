from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from sqlalchemy import DateTime, func, text

db = SQLAlchemy()
def get_uuid():
    return uuid4().hex

def future_date(days):
    return (datetime.now() + timedelta(days=days)).date()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String, primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    problem_list = db.relationship('Problem', backref='user', cascade='all, delete-orphan')


class Problem(db.Model):
    id = db.Column(db.String, primary_key=True, unique=True, default=get_uuid)
    problem_name = db.Column(db.String(200), nullable=False, unique=True)
    url = db.Column(db.String(200), nullable=False)
    date = db.Column(db.DateTime, default=func.current_date())
    review_dates = db.relationship('ReviewDate', cascade='all, delete-orphan', backref='problem')
    owner = db.Column(db.String(50), db.ForeignKey("users.username"))

    def __init__(self, **kwargs):
        super(Problem, self).__init__(**kwargs)
        self.add_default_review_dates()

    def add_default_review_dates(self):
        days = [0, 1, 3, 7, 21, 30]
        for day in days:
            review_date = ReviewDate(review_date=(datetime.now() + timedelta(days=day)).date())
            self.review_dates.append(review_date)

    def to_json(self):
        return {
            "id": self.id,
            "problemName": self.problem_name,
            "url": self.url,
            "date": self.date,
            "owner": self.owner
        }
    
class ReviewDate(db.Model):
    id = db.Column(db.String, primary_key=True, unique=True, default=get_uuid)
    problem_id = db.Column(db.String, db.ForeignKey('problem.id'), nullable=False)
    review_date = db.Column(db.Date, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "problem_id": self.problem_id,
            "review_date": self.review_date
        }

