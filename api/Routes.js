const router = require('express').Router();

module.exports = (user) => {
    router.get('/', (req, res) => user.FetchUsers(req, res));
    router.get('/:id', (req, res) => user.FetchUser(req, res));
    router.post('/', (req, res) => user.Create(req, res));
    router.put('/:id', (req, res) => user.Update(req, res));
    router.delete('/:id', (req, res) => user.Delete(req, res));
    return router;
};
