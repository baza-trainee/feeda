FROM python:3.11

ENV PYTHONUNBUFFERED 1

RUN mkdir /feeda
WORKDIR /feeda

COPY requirements.txt /feeda/
RUN pip install -r requirements.txt

COPY . /feeda/