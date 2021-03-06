import {
    read,
    write
} from '../utils/model.js';
import sha256 from 'sha256';
import jwt from '../utils/jwt.js';
import path from 'path';
import { InternalServerError } from '../utils/errors.js';



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
        let users = read('users')
        let { avatar } = req.files
        console.log(avatar);
        
        let user = users.find(user => user.first_name == req.body.first_name)

        if (user) {
            return next(new AuthrizationError(401, 'this username exists'))
        }

        let fileName = Date.now() + avatar.name.replace(/\s/g, '')
        avatar.mv(path.join(process.cwd(), 'public', 'img', fileName))
        req.body.id = users.length ? users.at(-1).id + 1 : 1
        req.body.password = sha256(req.body.password)
        req.body.avatar = fileName  


        console.log(req.body);
        users.push(req.body)
        write('users', users)

        delete req.body.password

        res.status(201).json({
            status: 201,
            message: 'success',
            token: jwt.sign({
                id: req.body.id
            }),
            data: req.body
        })
    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
} 

const PROFILE = (req, res) => {
    try {
        let users = read('users')
        let userId = jwt.verify(req.headers.token)
        console.log(req.headers.token);

        let profile = users.find(user => user.id == userId.id)

        console.log(profile);
        return res.json(profile)

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

export default {
    GET,
    LOGIN,
    REGISTER,
    PROFILE
}