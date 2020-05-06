import os

from werkzeug import secure_filename
from flask import (
    Flask,
    jsonify,
    send_from_directory,
    request,
    redirect,
    url_for
)
from flask_sqlalchemy import SQLAlchemy
from app.config import Config, CeleryConfig
from flask_migrate import Migrate
from celery import Celery
from celery.schedules import crontab
from flask_mail import Mail, Message
# from flask_login import LoginManager
import pprint
import six
import httplib2
from googleapiclient.discovery import build
import googleapiclient.http
import oauth2client.client
import tempfile
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

CELERY_TASK_LIST = [
    'app.application.tasks',
]

CELERY_BEAT_SCHEDULE = {
    'hello': {
        'task': 'app.application.tasks',
        'schedule': crontab()  # execute every minute
    }
}



db = SQLAlchemy()
migrate = Migrate()

app = Flask(__name__, template_folder='client/dist', static_folder='client/dist')
app.config.from_object(Config)

db.init_app(app)
migrate.init_app(app, db)
# mail = Mail(app)

# celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
# celery.conf.update(app.config)
# celery.config_from_object(CeleryConfig)
# login = LoginManager(app)
# login.login_view = 'login'



from app.application import bp as main_bp
app.register_blueprint(main_bp)



from app.application import routes

