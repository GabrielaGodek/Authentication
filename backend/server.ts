import express from 'express'
import cors from 'cors'

import { getUsers, registerUser, loginUser } from './controllers/user.controller'

const app = express()
const port = 8080

app.use(express.json())
app.use(cors())

app.get('/users', getUsers)
app.post('/register', registerUser)
app.post('/login', loginUser)

app.listen(port)
