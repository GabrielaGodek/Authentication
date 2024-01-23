import express from 'express';
import { getUsers, registerUser, loginUser } from '../controllers/user.controller';
const router = express.Router();

router.get('/', getUsers);

// POST /users/login
router.post('/login', loginUser);

// POST /users/register
router.post('/register', registerUser);

export default router;