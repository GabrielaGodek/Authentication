import express from 'express'
import cors from 'cors'
import { getUsers, registerUser, loginUser, getProfile } from './controllers/user.controller'
import { authenticate } from './includes/middlewares'

const app = express()
const port = 8080

app.use(express.json())
app.use(cors())
// app.use('/users', router);
app.post('/login', loginUser)
app.post('/register', registerUser)

app.get('/users', getUsers)
app.get('/', (req, res) => {
    res.json({ message: `Server is running ad ${port}` })
})

app.get('/profile', authenticate, getProfile);

app.listen(port, () => {
    console.log(`Server is running ad ${port}`)
})
