# ECF-TP-DWWM-Garage-02-06-2023

## Garage V.Parrot web app

[Link to the Website](https://garage-vparrot.clementfloret.dev/)

[Link to figma](https://www.figma.com/design/5AxYvgXovBbeH9OQWJWqwm/Garage-VParrot?node-id=89%3A330&t=vxEtfNeIqruOlGvR-1)

### Requirements

- Node (21.6.2) & Npm (10.2.4) [Nodejs.org](https://nodejs.org/)
- Python (3.12.2) [wiki.python.org](https://wiki.python.org/moin/BeginnersGuide/Download)
- Pip (24.0) [pip documentation](https://pip.pypa.io/en/stable/installation/)
- MariaDB (11.1.3) [https://mariadb.org/download/](https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.1.3)

### Installation

- Clone the repository :
  - `git clone https://github.com/floretcl/ECF-TP-DWWM-Garage-02-06-2023.git`

- Install and create virtual env :
  - Go to garage_vparrot root folder (with "manage.py" file) : `cd ECF-TP-DWWM-Garage-02-06-2023/garage_vparrot`
  - Install virtualenv with pip : `python3 -m pip install virtualenv`
  - Create a virtualenv `python3 -m venv venv`
  - Start virtual env : `source venv/bin/activate` 

- Install Django and pip packages :
  - Upgrade pip : `pip install --upgrade pip`
  - Install requirements `pip install -r requirements.txt`

- Initialize npm and install tailwindcss :
  - `npm init -y`  
  - `npm install -D tailwindcss`

- Create css output file with Tailwindcss :
  - `npm run tailwind-build`

- Create database with MariaDB :
  - `CREATE DATABASE garage_vparrot;`

- Create an admin with password (replace username and password by yours) :
  - `CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';`

- Add admin privileges : 
  - `GRANT ALL ON garage_vparrot.* TO 'admin'@'localhost';`
  - `FLUSH PRIVILEGES;`

- Create and set .env file
  - Go to garage_vparrot project folder (with "settings.py" file) : `cd garage_vparrot`
  - create an .env file 
  - copy and replace with your secret_key and your mariadb admin username, password (create a secret_key with at least 50 characters) :

    ```
    DEBUG=True
    ENV=DEV
    SECRET_KEY=secret_key

    DB_NAME=garage_vparrot
    DB_USER=admin
    DB_PASSWORD=password
    DB_HOST=localhost
    DB_PORT=3306
    
    EMAIL_HOST=localhost
    EMAIL_PORT=8025
    EMAIL_HOST_USER=
    EMAIL_HOST_PASSWORD=
    EMAIL_USE_TLS=
    EMAIL_USE_LOCALTIME=True
    
    ADMINS=[("username", "email")]
    ```
    
- Initialize database :
  - Go to garage_vparrot root folder (with "manage.py" file) : `cd ..`
  - `python manage.py migrate`
  - `python manage.py loaddata contenttypes.json`
  - `python manage.py loaddata sample.json`

- Create an admin superuser :
  - `python manage.py createsuperuser`

- Check project with : `python manage.py check`

- Run Django server:
  - `python manage.py runserver`
  -  now the wep app should be accessible at the following url : [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

#### Configuring email for development (Avoiding errors when submitting a contact form)
- Start a "dumb" smtp server with aiosmtpd
  - `python3 -m aiosmtpd -n -l localhost:8025`
- aiosmtpd will receive the emails locally and display them to the terminal


"ECF - TP DWWM - Sujet Garage" - Created on 02 June 2023.
