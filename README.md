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

- Add admin privileges to database : 
  - `GRANT ALL ON garage_vparrot.* TO 'admin'@'localhost';`
  - `FLUSH PRIVILEGES;`

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

- Install tailwindcss with npm :
  - Install [Nodejs and npm](https://nodejs.org/) 
  - `npm install`

- Create and set .env file
  - `cd garage_vparrot` (dir : ECF-TP-DWWM-Garage-02-06-2023/garage_vparrot/garage_vparrot)
  - create an .env file 
  - copy and replace with your mariadb user password and secret_key (create a secret_key with at least 50 characters) :

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
- Initialize Database and create admin superuser :
  - In garage_vparrot root folder (with manage.py file) :
    - `python manage.py migrate`

- Migrate and load data :
  - `python manage.py loaddata contenttypes.json`
  - `python manage.py makemigrations`
  - `python manage.py migrate`
  - `python manage.py loaddata sample.json`

- Check project with : `python manage.py check`

- Create an admin superuser :
  - `python manage.py createsuperuser`

- Run Django server:
  - `python manage.py runserver`

"ECF - TP DWWM - Sujet Garage" - Created on 02 June 2023.
