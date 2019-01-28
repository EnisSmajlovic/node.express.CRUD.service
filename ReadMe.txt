Simple Node Express CRUD service using Mongoose to write to MongoDB database.

Installation:

Install MongoDB.

Clone repo.

Run     npm i               inside root directory.

Create .env file in root directory and set the following values for:
    NODE_ENV    eg. development
    PORT        eg. 3000
    DB_HOST     eg. mongodb://localhost:27017/user_db

Run     npm run server      to start server.

Open in browser / Postman.

Get all users (by Query)
    http://[url]/user/?start=[value]&rows=[value]

CRUD using Postman as an example:
    Create
        http://[url]/user/
    Read
        http://[url]/user/[id]
        http://[url]/user/?start=[value]&rows=[value]
    Update
        http://[url]/user/[id]
    Delete
        http://[url]/user/[id]

Finally 
    npm test 
to run unit tests...

Some unit tests implemented to cover Get methods in controller and service modules.
Same principles would follow for full CRUD operation unit testing.
