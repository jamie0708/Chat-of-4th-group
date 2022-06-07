import express from 'express';
import cors from 'cors';
import usersRouter from './routers/users.js'

const PORT = process.env.PORT || 7777;
const app = express()

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use(usersRouter)


app.use((error, req, res, next) => {
    if (error.status != 500) {
        alert('Error: ' + error.message)
        return res.status(error.status).json({
            status: error.status,
            message: error.message
        })
    }

    fs.appendFileSync(path.join(process.cwd(), 'src', 'logs.txt'),
        `${req.url}___${error.name}___${Date.now()}___${error.status}___${error.message}\n`
    )

    res.status(error.status).json({
        status: error.status,
        message: 'InternalServerError'
    })

    process.exit();
})

app.listen(PORT, () => console.log(`server listening on http://localhost:${PORT}`)); 