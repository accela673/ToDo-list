## Description

Preinstalled node js and npm required 

ToDo application on nestjs

To start this programm connect to your postgresql database via ".env" file and run the app

You can use this app only via API documentation (http://localhost:5000/swagger)

Todo app can:

1. Show all todos (GET)

2. Show one todo by id in database (GET)

3. Create new todo (POST)

4. Update todo by in in database (PUT)

5. Delete todo by id in database (DELETE)


## Required

```bash
# nest js
npm i -g @nestjs/cli

# typeorm postgresql
npm install --save @nestjs/typeorm typeorm pg

# configuration module
npm i --save @nestjs/config

# swagger
npm install --save @nestjs/swagger

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## License

Nest is [MIT licensed](LICENSE).
