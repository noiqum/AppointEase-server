import express from 'express'
const router = express.Router()
import {createUserHandler,loginHandler,logout, refresh} from '../controller/user.controller'


router.route('/register')
    .post(createUserHandler)

router.route('/login')
    .post(loginHandler)

router.route('/logout')
    .get(logout)

router.route('/refresh')
    .get(refresh)
    

module.exports = router