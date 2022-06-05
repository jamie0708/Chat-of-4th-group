import {read, write} from '../utils/model.js';


const GET = (req, res) => {
    res.send('users')
}


// import {
//     read,
//     write
// } from '../utils/helpers.js';
// import sha256 from 'sha256';
// import jwt from 'jsonwebtoken';
// const secret = 'secret';


// const POST = (req, res) => {
//     try {
//         let {
//             first_name,
//             password
//         } = req.body
//         let users = read('users') || []
//         let user = users.find(user => user.first_name === first_name && user.password === sha256(password))

//         if (user) {
//             return res.status(200).send({
//                 status: '200',
//                 message: 'succes',
//                 token: jwt.sign({
//                     id: user.id,
//                 }, secret)
//             })
//         }

//         throw new Error("wrong username or password")

//     } catch (error) {
//        return res.status(401).send({
//             status: '401',
//             message: error.message,
//             token: null
//         })
//     }
// }


export default {
    GET,
    // POST
}

