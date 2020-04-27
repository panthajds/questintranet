from flask import Blueprint

bp = Blueprint('main', __name__, template_folder="./dist")

from app.application import routes