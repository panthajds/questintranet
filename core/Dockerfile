# File     : Dockerfile
# Date     : 13.01.2020
# Author   : Matthieu Petiteau <mpetiteau.pro@gmail.com>
#
# Dockerfile to run our Flask app with Gunicorn.
#

FROM python:3.8.0-alpine

# Install needed dependencies for Python 3.
RUN apk update && \
    apk add build-base python3 python3-dev libffi-dev libressl-dev && \
    ln -sf /usr/bin/python3 /usr/bin/python && \
    ln -sf /usr/bin/pip3 usr/bin/pip && \
    pip install --upgrade pip

# Our application directory on our Alpine image.
ENV APP_PATH /usr/src/app
RUN mkdir -p $APP_PATH
WORKDIR $APP_PATH/core

# Create a group app and a non-root user app to run our container.
RUN addgroup app && \
    adduser --disabled-password --gecos "" --ingroup app --no-create-home app

# Copy our requirement file to the workdir on our Alpine image and 
# process to install.
COPY requirements.txt .

#RUN apk update && apk add libpq
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python3 -m pip install --upgrade -r  requirements.txt --no-cache-dir && \
 apk --purge del .build-deps
#RUN pip install --upgrade pip
#RUN pip install --no-cache /wheels/*
#RUN apt install libpq-dev python-dev
#RUN pip install -r requirements.txt
# RUN flask db upgrade
# Copy content from our core/ directory to the workdir on our Alpine
# image so we've got the app ready to be launched.
COPY . .

# Switch to our app user.
# USER app
