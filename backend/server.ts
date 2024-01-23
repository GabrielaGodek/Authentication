import express from 'express'
import cors from 'cors'
import { getUsers, registerUser, loginUser } from './controllers/user.controller'
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

app.get('/profile', authenticate, (req, res) => {
    res.json({ message: 'profile' })
    // const userId = req.userId;
    // console.log('server.ts', req)
    // const sql = "SELECT * FROM users WHERE id = ?";
    // db.query(sql, [userId], (err, result) => {
    //     if (err || result.length === 0) {
    //         res.status(500).json({ message: "Error Fetching Details" })
    //     } else {
    //         res.json({ username: result[0].username });
    //     }
    // })
});

app.listen(port, () => {
    console.log(`Server is running ad ${port}`)
})
