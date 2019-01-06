/* eslint no-process-env: 0 */
require('dotenv').config();

const mongoose = require('mongoose'),
    express = require('express'),
    app = express();

const Service = require('./service/Service'),
    Controller = require('./controller/Controller'),
    Routes = require('./api/Routes');

const user = new Controller(new Service());

mongoose
    .connect(process.env.DB_HOST, { useNewUrlParser: true })
    .then(() => console.log('Connected to db...'))
    .catch((err) => console.error('Could not connect to the db...', err));

app.use(express.json());
app.use('/user', Routes(user));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}...`));
