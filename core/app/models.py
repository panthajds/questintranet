from datetime import datetime
from app import db, login
from sqlalchemy import Table, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

Base = declarative_base()

class FlushDevice(db.Model):
    __tablename__ = 'flushdevice'
    id = db.Column(db.Integer, primary_key=True)
    serial_no = db.Column(db.String(1000), unique=True)
    volume = db.Column(db.Float, default=1.6)
    state = db.Column(db.Integer, default=0)
    delay = db.Column(db.Integer, default=7000)
    battery = db.Column(db.Integer, default=100)
    reset = db.Column(db.DateTime, default=datetime.utcnow)
    flushes = db.relationship('Flush', backref='flush_flush', lazy='dynamic')
    maintenance = db.relationship('FlushMaintenance', backref='flush_maintenance', lazy='dynamic')
    stall_id = db.Column(db.Integer, ForeignKey('stall.id'))
    stall = db.relationship('Stall', back_populates='flush')


class Flush(db.Model):
    __tablename__ = 'flush'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime, default=datetime.utcnow)
    device = db.Column(db.Integer, db.ForeignKey('flushdevice.id'))
    volume = db.Column(db.Integer)
    method = db.Column(db.Integer)


class FlushMaintenance(db.Model):
    __tablename__ = 'flushmaintenance'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime, default=datetime.utcnow)
    notes = db.Column(db.String(1024))
    method = db.Column(db.Integer)
    device = db.Column(db.Integer, db.ForeignKey('flushdevice.id'))


class LatchDevice(db.Model):
    __tablename__ = 'latchdevice'
    id = db.Column(db.Integer, primary_key=True)
    serial_no = db.Column(db.String(1000), unique=True)
    state = db.Column(db.Integer, default=0)
    delay = db.Column(db.Integer, default=7000)
    battery = db.Column(db.Integer, default=100)
    reset = db.Column(db.DateTime, default=datetime.utcnow)
    maintenance = db.relationship('LatchMaintenance', backref='latch_maintenance', lazy='dynamic')
    actuations = db.relationship('Actuation', backref='latch_actuation', lazy='dynamic')
    stall_id = db.Column(db.Integer, ForeignKey('stall.id'))
    stall = db.relationship('Stall', back_populates='latch')


class Actuation(db.Model):
    __tablename__ = 'actuation'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime, default=datetime.utcnow)
    device = db.Column(db.Integer, db.ForeignKey('latchdevice.id'))
    close = db.Column(db.Boolean)
    method = db.Column(db.Integer)


class LatchMaintenance(db.Model):
    __tablename__ = 'latchmaintenance'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime, default=datetime.utcnow)
    notes = db.Column(db.String(1024))
    method = db.Column(db.Integer)
    device = db.Column(db.Integer, db.ForeignKey('latchdevice.id'))


class Stall(db.Model):
    __tablename__ = 'stall'
    id = db.Column(db.Integer, primary_key=True)
    flush = db.relationship("FlushDevice", uselist=False, back_populates="stall")
    latch = db.relationship("LatchDevice", uselist=False, back_populates="stall")
    status = db.Column(db.Integer)
    version = db.Column(db.Integer)
    name = db.Column(db.String(10))
    bathroom = db.Column(db.Integer, db.ForeignKey('bathroom.id'))


class Bathroom(db.Model):
    __tablename__ = 'bathroom'
    id = db.Column(db.Integer, primary_key=True)
    stalls = db.relationship("Stall", backref='bathroom_stalled', lazy='dynamic')
    status = db.Column(db.Integer)
    name = db.Column(db.String(140))
    building = db.Column(db.Integer, db.ForeignKey('building.id'))


class Building(db.Model, Base):
    __tablename__ = 'building'
    id = db.Column(db.Integer, primary_key=True)
    bathrooms = db.relationship("Bathroom", backref='building_installed', lazy='dynamic')
    users = db.relationship("User", secondary='manager')
    name = db.Column(db.String(1000))
    company = db.Column(db.Integer, db.ForeignKey('company.id'))

class Company(db.Model):
    __tablename__ = 'company'
    id = db.Column(db.Integer, primary_key=True)
    buildings = db.relationship("Building", backref='company_building', lazy='dynamic')
    employees = db.relationship("User", backref='company_employee', lazy='dynamic')
    name = db.Column(db.String(1000))
    logo = db.Column(db.String(1000))


class Manager(db.Model):
    __tablename__ = 'manager'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    building_id = db.Column(db.Integer, db.ForeignKey('building.id'))

    start = db.Column(db.DateTime, default=datetime.utcnow)

    user = relationship("User", backref=backref("manager_user", cascade="all, delete-orphan"))
    building = relationship("Building", backref=backref("manager_user", cascade="all, delete-orphan"))

class User(db.Model, Base, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(64), index=True)
    last_name = db.Column(db.String(64), index=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    buildings = db.relationship("Building", secondary="manager")
    company = db.Column(db.Integer, db.ForeignKey('company.id'))
    photo = db.Column(db.String(1000))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    def __repr__(self):
        return '<User {}>'.format(self.first_name+self.last_name)


@login.user_loader
def load_user(id):
    return User.query.get(int(id))