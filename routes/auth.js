/*
Rutas de usuario - Auth
host + api/auth
*/

const { Router } = require('express')
const { check } = require( 'express-validator' )
const router = Router()

const { createUser, loginUser, renewToken } = require('../controllers/auth')
const { validateFields } = require('../middlewares/middlewares')


router.get( '/renew', renewToken )

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
