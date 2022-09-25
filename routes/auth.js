/*
User routes - Auth
host + api/auth
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')
const router = Router()

const { createUser, loginUser, renewToken } = require('../controllers/auth')


router.get('/renew', validateJWT, renewToken )

router.post(
	'/new',
	[ //	middleware
		check( 'name', 'Name is required' ).not().isEmpty(),
		check('email', 'e-mail is required').isEmail(),
		check('password', 'Invalid password length').isLength({ min: 5 }),
		validateFields
	],
	createUser
)

router.post(
	'/',
	[
		check('email', 'e-mail is required').isEmail(),
		check('password', 'Invalid password length').isLength({ min: 5 }),
		validateFields
	],
	loginUser)

module.exports= router
