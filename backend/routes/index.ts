import express from 'express';
import { getUsers, registerUser, loginUser, deleteUser } from '../controllers/user.controller';
const router = express.Router();

router.get('/users', getUsers);

router.post('/login', loginUser);

router.post('/register', registerUser);

router.delete('/users/:id', deleteUser);

export default router;