import express from 'express'
const router = express.Router()
import {createUserHandler,loginHandler,logout} from '../controller/user.controller'
import {verifyJWT} from "../middleware/jwtVerify"

router.use(verifyJWT)
router.route('/create')
    .post(createUserHandler)

router.route('/delete')
    .post(loginHandler)

router.route('/update')
    .patch(logout)

module.exports = router