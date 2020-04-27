from flask import render_template, flash, redirect, url_for, request, jsonify
from flask_mail import Message
# from flask_login import current_user, login_user, logout_user, login_required
from app.application import bp
from app import db, app
# from app.forms import LoginForm, RegistrationForm
# from app.models import Flush, FlushDevice, FlushMaintenance, LatchDevice, Actuation, LatchMaintenance, User, Manager, Stall, Building, Bathroom, Company 
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.urls import url_parse



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
    return render_template('career.html')

# @bp.route('/login_test', methods=['GET'])
# @login_required
# def login_test():
#     return jsonify({'status': 'success'}), 200