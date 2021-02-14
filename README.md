# Simple todo app

This is a simple todo app

## Features
- user authentication
- todo creation, deletion and change
- filter and/or search for todos

## Technologies used
- React
- Loopback 4
- MySQL
- Docker

## How to build
### For development
Set the following default envionment variables (you can change them):
```
DB_CONNECTION_STRING=mysql://user:user@localhost:3306/todo
PORT=3000
JWT_SECRET=CHANGE_ME
```
```bash
cd server
npm install
npm run migrate
npm start
```
```bash
cd client
npm install
npm start
```
### For production
In `docker-compose.yml` set desired environment variables and ports and then run:

```bash
sudo docker-compose up
sudo docker-compose build
```
NOTE: if changing the todo-server port, you will need to also change the port in the api url in the file `client/src/services/httpService.js (line 9)`

By default, the web app will be accessible on port 80