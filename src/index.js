import express from 'express';
import fileUpload from 'express-fileupload'
import cors from 'cors';
import usersRouter from './routers/users.js'
import path from 'path';

const PORT = process.env.PORT || 7777;
const app = express()
app.use(cors());

app.use(express.json());
app.use(fileUpload())
app.use(express.static(path.join(process.cwd(), 'public', 'img')));

app.use(usersRouter)


app.use((error, req, res, next) => {
    if (error.status != 500) {
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