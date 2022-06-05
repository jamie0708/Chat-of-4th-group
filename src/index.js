import express from 'express';
import sha256 from 'sha256';
import cors from 'cors';

const PORT = process.env.PORT || 7777;
const app = express()

app.use(express.json());
app.use(cors());

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

    process.exit()
})
console.log(sha256("12345678"));

app.listen(PORT, () => console.log(`server listening on ${PORT}`)); 