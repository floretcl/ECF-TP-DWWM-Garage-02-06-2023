# ECF-TP-DWWM-Garage-02-06-2023

## Garage V.Parrot website

[Link to the Website](https://garage-vparrot.clementfloret.fr/)

### Requirements

- Python 3.11.2
- Django 4.2.3
- MySQL 8.0.33

### Installation

- Install python 3.11 [wiki.python.org](https://wiki.python.org/moin/BeginnersGuide/Download) 

- Install and start MySQL 8 [dev.mysql.com](https://dev.mysql.com/doc/refman/8.1/en/installing.html)

- Create database with mySQL : `CREATE DATABASE garage_vparrot;`

- Create user with privileges 
(replace user and password by yours)
   e.g. :
  - `CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';` 
  - `GRANT ALL PRIVILEGES ON garage_vparrot.* TO 'user'@'localhost';`

- Clone the repository :
  - `git clone https://github.com/floretcl/ECF-TP-DWWM-Garage-02-06-2023.git`

- Create virtual env :
  - `cd ECF-TP-DWWM-Garage-02-06-2023.git/`
  - `python -m pip install virtualenv`
  - or `python3 -m pip install virtualenv`
  - [Pypi virtualenv](https://pypi.org/project/virtualenv/)
  - `python -m venv env`
  - then start virtual env : `source env/bin/activate`

- Install Django and modules :
  - `cd garage_vparrot`
  - `pip install -r requirements.txt`

- Create and set .env file
  - create .env file in garage_vparrot folder with a file named settings.py
  - copy and remplate with yours mysql database name, username and password. Create and copy a secret_key with at least 50 characters :

    ```
    DEBUG=True
    ENV=DEV
    SECRET_KEY=secret_key

    DB_NAME=database_name
    DB_USER=user
    DB_PASSWORD=password
    DB_HOST=localhost
    DB_PORT=3306
    ```

- Migrate and loaddata :
  - In garage_vparrot folder with manage.py :
    - `python manage.py migrate`
    - `python manage.py sqlflush | ./manage.py dbshell`
    - `python manage.py loaddata contenttype.json`
    - `python manage.py loaddata dumpdata.json`

- Check install with : `python manage.py check`

- Run Django server:
  - `python manage.py runserver`

"ECF - TP DWWM - Sujet Garage" - Created on 02 June 2023.
