Node Express CRUD service

Installation:

1. Install mongoDB

2. Clone repo

3. Run (inside root): $npm i

4. Create .env file in root directory and set the following values for:
    NODE_ENV = development
    PORT     = 3000
    DB_HOST  = mongodb://localhost:27017/user_db

5. Start server: $npm run server

6. Open in browser / postman

6.1. Get all users (by Query)
    http://[url]/user/?start=[value]&rows=[value]

6.2. CRUD using Postman as an example:
    a) Create
        http://[url]/user/
    b) Read
        http://[url]/user/[id]
        http://[url]/user/?start=[value]&rows=[value]
    c) Update
        http://[url]/user/[id]
    d) Delete
        http://[url]/user/[id]

7. Run unit tests: $npm test
