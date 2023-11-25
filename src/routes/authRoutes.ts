import express from 'express'
const router = express.Router()
import {createUserHandler,loginHandler,logout} from '../controller/user.controller'


router.route('/register')
    .post(createUserHandler)

router.route('/login')
    .post(loginHandler)

router.route('/logout')
    .get(logout)

module.exports = router