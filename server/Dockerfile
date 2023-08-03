# Використовуємо базовий образ Python 3.11
FROM python:3.11

# Встановлюємо змінну середовища для Python, щоб уникнути проблеми з буферизацією
ENV PYTHONUNBUFFERED 1

# Створюємо директорію /feeda в образі
RUN mkdir /feeda
WORKDIR /feeda

# Копіюємо requirements.txt у /feeda/ в образі
COPY requirements.txt /feeda/

# Встановлюємо залежності Python з requirements.txt
RUN pip install -r requirements.txt

# Копіюємо всі файли проекту у /feeda/ в образі
COPY . /feeda/

# Виконуємо створення міграцій
RUN python manage.py makemigrations

# Виконуємо міграцію бази даних
RUN python manage.py migrate

# Команда для запуску Django сервера під час запуску контейнера
CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:8000"]
