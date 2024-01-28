import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import csrf from 'csurf'
// import bodyParser from 'body-parser'
import { getUsers, registerUser, loginUser, getProfile, deleteUser, updateUser } from './controllers/user.controller'
import { authenticate } from './includes/middlewares'
// import session from 'express-session'

const app = express()
const port = 8080

app.use(express.json())
app.use(cors())

// app.use(cookieParser());
// const csrfProtect = csrf({
//     cookie: true
// })
// app.use(csrfProtect);

app.post('/login', loginUser)
app.post('/register', registerUser)

app.get('/users', getUsers)
app.get('/profile', authenticate, getProfile);
app.get('/', (req, res) => {
    res.json({ message: `Server is running at ${port}` })
})

// app.get('/csrf', (req, res) => {
//     res.json({ csrfToken: req.csrfToken() });
// });

app.delete('/users/:id', deleteUser);

app.put('/users/:id', updateUser);

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})
