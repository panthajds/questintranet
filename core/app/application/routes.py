from flask import render_template, flash, redirect, url_for, request, jsonify, session, send_file
from flask_mail import Message
# from flask_login import current_user, login_user, logout_user, login_required
from app.application import bp
from app import db, app
# from app.forms import LoginForm, RegistrationForm
# from app.models import Flush, FlushDevice, FlushMaintenance, LatchDevice, Actuation, LatchMaintenance, User, Manager, Stall, Building, Bathroom, Company
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.urls import url_parse
import pprint
import six
import httplib2
from googleapiclient.discovery import build
import googleapiclient.http as ghttp
import oauth2client.client as client
import tempfile
import google_auth_oauthlib
from google.auth.transport.requests import Request
import json
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery
import io
import os

API_SERVICE_NAME = 'drive'
API_VERSION = 'v3'

SCOPES = 'https://www.googleapis.com/auth/drive'

# Location of the client secrets.
CLIENT_SECRETS_FILE = 'credentials.json'

# Path to the file to upload.
FILENAME = 'document.txt'

# Metadata about the file.
MIMETYPE = 'image/jpeg'
TITLE = 'My New Text Document'
DESCRIPTION = 'A shiny new text document about hello world.'


UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
# Create an authorized Drive API client.


@bp.route('/')
def index():
    return render_template('index.html')

# @bp.route('/magic', defaults={'path': ''})
# # @bp.route('/<path:path>')
# # @login_required
# def magic(path):
#     return render_template('magic.html')


@bp.route('/pastproj')
# @login_required
def pastproj():
    return render_template('pastproj.html')


@bp.route('/roomreserve')
# @login_required
def roomreserve():
    return render_template('roomreserve.html')


@bp.route('/calendar')
# @login_required
def calendar():
    return render_template('calendar.html')


@bp.route('/career')
# @login_required
def career():
    if 'credentials' not in session:
        return redirect('authorize')
    return render_template('magic.html')

# @bp.route('/storeauthcode/4/<code>', methods=['POST'])
# def storeauthcode(code):
#     if request.method == 'POST':
#         print(code)
#         with open('auth_code.txt', 'w') as f:
#             f.write('4/'+code)
#         f.close()
#         return jsonify({'status' : 'success'}), 200


@bp.route('/download/<file_id>/<file_name>', methods=['GET'])
def download(file_id, file_name):
    if 'credentials' not in session:
        return redirect('authorize')

    # Load credentials from the session.
    credentials = google.oauth2.credentials.Credentials(
        **session['credentials'])

    drive = googleapiclient.discovery.build(
        API_SERVICE_NAME, API_VERSION, credentials=credentials)
    request = drive.files().get_media(fileId=file_id)
    if not os.path.exists(file_name):
        fh = io.FileIO(file_name, 'wb')
        downloader = ghttp.MediaIoBaseDownload(fh, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
            print('Download ' + str(status.progress() * 100))

    # Save credentials back to session in case access token was refreshed.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
        session['credentials'] = credentials_to_dict(credentials)

    # file_name = file_name[file_name.rindex('/')+1]
    return jsonify({'file_name': file_name})


@bp.route('/view/<file_name>')
def view(file_name):
    return send_file('/usr/src/app/core/'+file_name, attachment_filename=file_name)


@bp.route('/code')
def code():
    auth_code = ''
    with open('auth_code.txt', 'w') as f:
        auth_code = f.read()
    return jsonify({'code': auth_code}), 200


@bp.route('/catcherror', methods=['GET', 'POST'])
def catcherror():
    global error_message
    print('hai')
    if request.method == 'GET':
        return jsonify({'error': error_message}), 200
    if request.method == 'POST':
        error_message = request.get_json()
        return jsonify({'error': error_message}), 200


@app.route('/test')
def test_api_request():
    if 'credentials' not in session:
        return redirect('authorize')

    # Load credentials from the session.
    credentials = google.oauth2.credentials.Credentials(
        **session['credentials'])

    drive = googleapiclient.discovery.build(
        API_SERVICE_NAME, API_VERSION, credentials=credentials)

    files = drive.files().list(q="mimeType='application/vnd.google-apps.folder'",
                               spaces='drive', pageSize=10).execute()

    # Save credentials back to session in case access token was refreshed.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
    session['credentials'] = credentials_to_dict(credentials)

    return jsonify(**files)


@app.route('/folder/<folder_id>')
def folder(folder_id):
    if 'credentials' not in session:
        return redirect('authorize')

    # Load credentials from the session.
    credentials = google.oauth2.credentials.Credentials(
        **session['credentials'])

    drive = googleapiclient.discovery.build(
        API_SERVICE_NAME, API_VERSION, credentials=credentials)
    query = '\''+folder_id+'\' in parents'
    files = drive.files().list(q=query, spaces='drive', pageSize=10).execute()

    # Save credentials back to session in case access token was refreshed.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
    session['credentials'] = credentials_to_dict(credentials)

    return jsonify(**files)


@app.route('/authorize')
def authorize():
    # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES)

    # The URI created here must exactly match one of the authorized redirect URIs
    # for the OAuth 2.0 client, which you configured in the API Console. If this
    # value doesn't match an authorized URI, you will get a 'redirect_uri_mismatch'
    # error.
    flow.redirect_uri = url_for('oauth2callback', _external=True)

    authorization_url, state = flow.authorization_url(
        # Enable offline access so that you can refresh an access token without
        # re-prompting the user for permission. Recommended for web server apps.
        access_type='offline',
        # Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes='true')

    # Store the state so the callback can verify the auth server response.
    session['state'] = state

    return redirect(authorization_url)


@app.route('/oauth2callback')
def oauth2callback():
    # Specify the state when creating the flow in the callback so that it can
    # verified in the authorization server response.
    state = session['state']

    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES, state=state)
    flow.redirect_uri = url_for('oauth2callback', _external=True)

    # Use the authorization server's response to fetch the OAuth 2.0 tokens.
    authorization_response = request.url
    flow.fetch_token(authorization_response=authorization_response)

    # Store credentials in the session.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
    credentials = flow.credentials
    session['credentials'] = credentials_to_dict(credentials)

    return redirect(url_for('test_api_request'))


@app.route('/revoke')
def revoke():
    if 'credentials' not in session:
        return ('You need to <a href="/authorize">authorize</a> before ' +
                'testing the code to revoke credentials.')

    credentials = google.oauth2.credentials.Credentials(
        **session['credentials'])

    revoke = requests.post('https://oauth2.googleapis.com/revoke',
                           params={'token': credentials.token},
                           headers={'content-type': 'application/x-www-form-urlencoded'})

    status_code = getattr(revoke, 'status_code')
    if status_code == 200:
        return('Credentials successfully revoked.' + print_index_table())
    else:
        return('An error occurred.' + print_index_table())


@app.route('/clear')
def clear_credentials():
    if 'credentials' in session:
        del session['credentials']
    return ('Credentials have been cleared.<br><br>' +
            print_index_table())


def credentials_to_dict(credentials):
    return {'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'client_secret': credentials.client_secret,
            'scopes': credentials.scopes}



# @bp.route('/user/<user_email>', methods=['GET','POST','PUT'])
# def user(user_email):
#     if request.method == 'GET':
#         user = User.query.filter_by(email=user_email).first()
#         buildings = user.buildings
#         building_list = []
#         for building in buildings:
#             info = {'name': building.name}
#             building_list.append(info)
#         return jsonify({'status' : 'success', 'data': {'first_name': user.first_name,'last_name' : user.last_name,
#          'buildings': building_list, 'email' : user_email, 'company' : user.company, 'photo' : user.photo}}), 200
#     if request.method == 'POST':
#         data = request.get_json()
#         pw_hash = generate_password_hash(data['password'])
#         user = User(email=user_email, first_name=data['first_name'], last_name=data['last_name'], photo=data['photo'],
#         password_hash=pw_hash)
#         db.session.add(user)
#         db.session.commit()
#         return jsonify({'status': 'success'}), 200
#     return 404

# @bp.route('/users')
# def users():
#     user_query = User.query.all()
#     user_list = []
#     for user in user_query:
#         user_list.append({'first_name' : user.first_name, 'last_name' : user.last_name, 'email' : user.email, 'id': user.id})
#     return jsonify({'status' : 'success', 'data' : {'users' : user_list}}), 200

# @bp.route('/test/', methods=['GET','POST','PUT'])
# def test():
#     if request.method == 'GET':
#         return jsonify({'status': 'success'}), 200
#     if request.method == 'POST':
#         data = request.get_json()
#         return jsonify({'status': 'success', 'data' : data}), 200
#     if request.method == 'PUT':
#         db.session.add(LatchDevice(serial_no='1'))
#         db.session.add(FlushDevice(serial_no='1'))
#         db.session.add(Actuation(device=1, method=0, close=True))
#         db.session.add(Flush(device=1, method=0, volume=1.6))
#         db.session.add(FlushMaintenance(device=1, notes="battery change", method=0))
#         db.session.add(LatchMaintenance(device=1, notes="battery change", method=0))
#         latch = LatchDevice.query.first()
#         flush = FlushDevice.query.first()
#         db.session.add(Stall(name='test', flush=flush, latch=latch, version=0, status=0))
#         db.session.add(User(first_name='Jack', last_name='Sturtevant', email='jack.a.sturtevant@gmail.com'))
#         db.session.commit()
#         return jsonify({'status': 'success'}), 200
#     return 404

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if current_user.is_authenticated:
#         return redirect(url_for('main.magic'))
#     form = LoginForm()
#     if form.validate_on_submit():
#         user = User.query.filter_by(email=form.email.data).first()
#         if user is None or not user.check_password(form.password.data):
#             flash('Invalid email or password')
#             return redirect(url_for('login'))
#         login_user(user, remember=form.remember_me.data)
#         next_page = request.args.get('next')
#         if not next_page or url_parse(next_page).netloc != '':
#             next_page = url_for('main.magic')
#         return redirect(next_page)
#     return render_template('login.html', title='Sign In', form=form)

# @app.route('/logout', methods=['POST'])
# def logout():
#     logout_user()
#     return redirect(url_for('login'))


# @app.route('/register', methods=['GET', 'POST'])
# def register():
#     if current_user.is_authenticated:
#         return redirect(url_for('index'))
#     form = RegistrationForm()
#     if form.validate_on_submit():
#         user = User(first_name=form.first_name.data, last_name=form.last_name.data, email=form.email.data)
#         user.set_password(form.password.data)
#         db.session.add(user)
#         db.session.commit()
#         flash('Congratulations, you are now a registered user!')
#         return redirect(url_for('login'))
#     return render_template('register.html', title='Register', form=form)


# @bp.route('/login_test', methods=['GET'])
# @login_required
# def login_test():
#     return jsonify({'status': 'success'}), 200
