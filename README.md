# DaiHire app
An application for scheduling interviews at Daitan 

## Running the app
To run the app the system must have docker installed. 
Pull down the git repo  

``` bash 
git pull https://github.com/Jacob-warnes/capstoneProject.git
```
Inside the docker_scripts\app  directory create a public and private key named id_rsa and id_rsa.pub
```bash
 {location of your repo}\docker_scripts\app\
```
Add the public key to the git repo at this url
```
https://github.com/Jacob-warnes/capstoneProject/settings/keys
```

At the root level run docker-compose up -d to start the application.
Navigate to https://localhost:3000 to see the site 


## Configuring the app
Open the docker-compose file to edit the application settings 

the file should look like this 
```YML
version: "3"
services:
  web:
    depends_on:
      - db
    build:
      context: .\docker_scripts\app
      args:
        - PEM_PASS=pass
        - API_URL=https://localhost:3000/api/v1
        - APP_URL=https://localhost:3000
        - PORT=3000
        - DB_URL=db
        - MYSQL_USER=daihire
        - MYSQL_PASSWORD=daihire
    ports:
      - "3000:3000"
    links:
      - db
  db:
    build: 
      context: .\docker_scripts\db
    environment:
      - MYSQL_ROOT_PASSWORD=pass
      - MYSQL_USER=daihire
      - MYSQL_PASSWORD=daihire
    ports: 
      - "3306:3306"
```
The args for the web service explained 

* PEM_PASS: Pass phrase for https certificate 
* API_URL: The url for api fetch request 
* APP_URL: The url for the application
* PORT: Port the application runs on(needs to match the port for the web service)
* DB_URL: Link to the database( leave this as db)
* MYSQL_USER: The databse user that the app uses
* MYSQL_PASSWORD: Password for the user

The evironment variables for the database 

* MYSQL_ROOT: The password for the database root user 
* MYSQL_USER: The databse user that the app uses (must be same as web arg)
* MYSQL_PASSWORD: Password for the user (must be same as web arg)