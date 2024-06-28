from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:
    # set up db
    SECRET_KEY = os.environ["SECRET_KEY"]

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///mydb.db"

    # set up session (redis)
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_URL = redis.from_url("redis://127.0.0.1:6379")
