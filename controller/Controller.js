/* eslint no-magic-numbers: 0 */
const { validateId, validateQuery, validateUser } = require('../validation/Validate');

/**
 * Controller
 */
class Controller {
    /**
     * @param {Service} Service injected as constructor
     */
    constructor(Service) {
        this.Service = Service;
    }

    /**
     * Fetch user
     * @param {req} req request
     * @param {res} res response
     * @returns {user} return user
     */
    async FetchUser(req, res) {
        const { value, error } = validateId(req.params);

        if(error) {
            return res.status(400).send(error);
        }

        try {
            const user = await this.Service.FetchUser(value.id);

            if(!user) {
                return res.status(404).send('Error 404 ID not found');
            }

            return res.status(200).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    /**
     * Fetch users by query
     * @param {req} req request
     * @param {res} res response
     * @returns {users} return users
     */
    async FetchUsers(req, res) {
        const { value, error } = validateQuery(req.query);

        if(error) {
            return res.status(400).send(error);
        }

        try {
            const users = await this.Service.FetchUsers(
                value.start,
                value.rows
            );

            return res.status(200).send(users);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    /**
     * Create user
     * @param {req} req request
     * @param {res} res response
     * @returns {user} return created user
     */
    async Create(req, res) {
        const { value, error } = validateUser(req.body);

        if(error) {
            return res.status(400).send(error);
        }

        try {
            const user = await this.Service.Create(
                value.email,
                value.givenName,
                value.familyName
            );

            return res.status(200).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    /**
     * Update user
     * @param {req} req request
     * @param {res} res response
     * @returns {user} return updated user
     */
    async Update(req, res) {
        const { value, error } = validateUser(req.body);

        if(error) {
            return res.status(400).send(error);
        }

        try {
            const user = await this.Service.Update(
                req.params.id,
                value.email,
                value.givenName,
                value.familyName
            );

            if(!user) {
                return res.status(404).send('Error 404 ID not found');
            }

            return res.status(200).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    /**
     * Delete user
     * @param {req} req request
     * @param {res} res response
     * @returns {user} return deleted user
     */
    async Delete(req, res) {
        const { value, error } = validateId(req.params);

        if(error) {
            return res.status(400).send(error);
        }

        try {
            const user = await this.Service.Delete(value.id);

            if(!user) {
                return res.status(404).send('Error 404 ID not found');
            }

            return res.status(200).send(user);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = Controller;
