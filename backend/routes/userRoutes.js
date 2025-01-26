const express = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(['admin']), getUsers);
router.post('/', authMiddleware(['admin']), createUser); 
router.put('/:id', authMiddleware(['admin']), updateUser);
router.delete('/:id', authMiddleware(['admin']), deleteUser);

module.exports = router;