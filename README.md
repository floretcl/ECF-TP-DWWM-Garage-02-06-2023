# ECF-TP-DWWM-Garage-02-06-2023

## Garage V.Parrot website

[Link to the Website](https://garage-vparrot.clementfloret.fr/)

### Requirements

- Python 3.11.5
- Django 4.2.3
- MariaDB 10.11.4

### Installation

- Install python 3.11 [wiki.python.org](https://wiki.python.org/moin/BeginnersGuide/Download) 

- Install and start MariaDB 10.11 [https://mariadb.org/download/](https://dev.mysql.com/doc/refman/8.1/en/installing.html)

- Create database with MariaDB :
  - `CREATE DATABASE garage_vparrot;`

- Create an admin with privileges (replace password by yours) :
  - `CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';`

- Clone the repository :
  - `git clone https://github.com/floretcl/ECF-TP-DWWM-Garage-02-06-2023.git`

- Install and create virtual env :
  - `cd ECF-TP-DWWM-Garage-02-06-2023/garage_vparrot`
  - Install [Pypi virtualenv](https://pypi.org/project/virtualenv/)
  - `python3 -m pip install virtualenv`
  - Create `python3 -m venv venv`
  - then start virtual env : `source venv/bin/activate`
  - update pip version : `pip install --upgrade pip`

- Install Django and other packages :
  - `pip install -r requirements.txt`

- Create and set .env file
  - create .env file in garage_vparrot app folder (with a file named settings.py)
  - copy and replace with your mariadb user password and secret_key. 
  - create and copy a secret_key with at least 50 characters :

    ```
    DEBUG=True
    ENV=DEV
    SECRET_KEY=secret_key

    DB_NAME=garage_vparrot
    DB_USER=admin
    DB_PASSWORD=password
    DB_HOST=localhost
    DB_PORT=3306
    ```

- Migrate and load data :
  - In garage_vparrot root folder (with manage.py) :
    - `python manage.py migrate`
    - `python manage.py sqlflush | ./manage.py dbshell`
    - `python manage.py loaddata contenttype.json`
    - `python manage.py loaddata dumpdata.json`

- Add admin privileges to database : 
  - `GRANT ALL PRIVILEGES ON garage_vparrot.* TO 'admin'@'localhost';`
  - `FLUSH PRIVILEGES;`

- Check install with : `python manage.py check`

- Run Django server:
  - `python manage.py runserver`

"ECF - TP DWWM - Sujet Garage" - Created on 02 June 2023.
