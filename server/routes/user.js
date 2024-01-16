const express = require('express');
const router = express.Router();

const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const User = require('../models/user');


/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get('/', ensureLoggedIn, async function (req, res, next) {
    try {
        let users = await User.get();
        return res.json({ users });
    } catch (e) {
        return next(e);
    }
});



module.exports = router;