import {
    read,
    write
} from '../utils/model.js';
import sha256 from 'sha256';
import jwt from '../utils/jwt.js';



const GET = (req, res) => {
    res.send(read('users'))
}

const LOGIN = (req, res) => {
    try {
        let users = read('users') || []
        let {
            first_name,
            password
        } = req.body
        let user = users.find(user => user.first_name === first_name && user.password === sha256(password))

        if (user) {
            res.status(200).send({
                status: '200',
                message: 'succes',
                token: jwt.sign({
                    id: user.id,
                })
            })
        }

        throw new Error("wrong username or password")

    } catch (error) {
        res.status(401).send({
            status: '401',
            message: error.message,
            token: null
        })
    }
}

const REGISTER = (req, res) => {
    
    try {
        let {first_name, email, password, avatar} = req.body
        let users = read('users')
        
        req.body.id = users.length ? users.at(-1).id + 1 : 1
        password = sha256(password)

        let user = users.find(user => user.first_name == first_name)

        if(user){
            return next( new AuthrizationError(401, 'this username exists') )
        }
        users.push(req.body)
        write('users', users)

        delete req.body.password

        res.status(201).json({
            status: 201,
            message: 'success',
            token: jwt.sign({userId: req.body.userId}),
            data: req.body  
        })
    } catch (error) {
        return next( new InternalServerError(500, error.message) )
    }
}

export default {
    GET,
    LOGIN,
    REGISTER
}