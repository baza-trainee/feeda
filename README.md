**Local use**

1. Make sure you have installedd and authorized `Docker Desktop`

2. Go to the server directory `cd server`

3. Tape in command line (Terminal) `docker-compose up`, if not working `docker compose up`

4. Go to Docker Desktop and open `my-django-app` in `server`
   ![Screenshot](docker.png)

5. Then go to the terminal
   ![Screenshot](docker-terminal.png)

6. Make migrations by 2 commands:

- `python manage.py makemigrations`
- `python manage.py migrate`

7. Then create superuser (it will be our admin for DB usage):

- `python manage.py createsuperuser`
  - add email Email:[random@eamail.com]
  - add pass Password:[random pass] (while pasting, the pass will not appear, коли вводиш пароль не відображається)
- if you see the message `Bypass password validation and create user anyway? [y/N]: y` - just paste `y`

8. Go to web and login just created superuser
   ![Screenshot](go-to-localweb.png)

9. Use API as `http://localhost:8000/`

10. After all this steps are done, next time you don't have to do them, just start docker server from Docker Desktop, that's will be enougth.
