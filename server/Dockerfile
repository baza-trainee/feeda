FROM python:3.11

ENV PYTHONUNBUFFERED 1

RUN mkdir /feeda
WORKDIR /feeda

COPY requirements.txt /feeda/

RUN pip install -r requirements.txt

COPY . /feeda/

CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
