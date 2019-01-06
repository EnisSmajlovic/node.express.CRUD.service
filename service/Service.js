/* eslint no-magic-numbers: 0 */
/* eslint no-undefined: 0 */

const User = require('../model/Model');

/**
 * Service
 */
class Service {
    /**
     * Fetch user by ID
     * @param {id} id param
     * @returns {user} document
     */
    FetchUser(id) {
        try {
            const user = User.findOne({ id: id });

            return user;
        } catch (err) {
            throw new Error('Internal server error');
        }
    }

    /**
     * Fetch users by query
     * @param {start} start page
     * @param {rows} rows documents
     * @returns {query} documents
     */
    async FetchUsers(start, rows) {
        const query = {};

        try {
            const users = await User.find(query)
                .skip(start * rows)
                .limit(rows);

            return { users };
        } catch (err) {
            throw new Error('Internal server error');
        }
    }

    /**
     * Create user
     * @param {email} email param
     * @param {name} name param
     * @param {lastname} lastname param
     * @returns {user} save document
     */
    async Create(email, name, lastname) {
        try {
            let user = new User({
                email       : email,
                givenName   : name,
                familyName  : lastname
            });

            user = await user.save();
            return user;
        } catch (err) {
            throw new Error('Internal server error');
        }
    }

    /**
     * Update user
     * @param {id} id param
     * @param {email} email param
     * @param {name} name param
     * @param {lastname} lastname param
     * @returns {user} update document
     */
    async Update(id, email, name, lastname) {
        try {
            const user = await User.findOneAndUpdate({ id: id }, {
                email       : email,
                givenName   : name,
                familyName  : lastname,
                updatedAt   : new Date()
            }, { new: true });

            return user;
        } catch (err) {
            throw new Error('Internal server error');
        }
    }

    /**
     * Delete user
     * @param {id} id param
     * @returns {user} document
     */
    Delete(id) {
        try {
            const user = User.findOneAndDelete({ id: id });

            return user;
        } catch (err) {
            throw new Error('Internal server error');
        }
    }
}

module.exports = Service;
