import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import cors from 'cors'
import { getUsers, registerUser, loginUser, getProfile, deleteUser, updateUser } from './controllers/user.controller'
import { authenticate } from './includes/middlewares'

const app = express()
const port = 8080

app.use(express.json())
app.use(cors())

app.post('/login', loginUser)
app.post('/register', registerUser)

app.get('/users', getUsers)
app.get('/profile', authenticate, getProfile);
app.get('/', (req, res) => {
    res.json({ message: `Server is running ad ${port}` })
})

app.delete('/users/:id', deleteUser);

app.put('/users/:id', updateUser);



app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});
app.listen(port, () => {
    console.log(`Server is running ad ${port}`)
})
