const { response } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../db/models/user')
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {

	const { name, email, password } = req.body

	try {

		let user = await User.findOne({ email })

		if (user) {
			return res.status(400).json({
				ok: false,
				message: `A user whit email: [${email}] already exist.`
			})
		}
		user = new User(req.body)

		// Encrypting password
		const salt = bcrypt.genSaltSync()
		user.password = bcrypt.hashSync(password, salt)

		await user.save()

		// * Generate JWT
		const token = await generateJWT(user.id, user.name)

		res.status(201).json({
			ok: true,
			message: 'New registered user',
			_id: user.id,
			name: user.name,
			email: user.email,
			password: user.password,
			token
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			ok: false,
			message: 'Please, contact db admin'
		})
	}
}


const loginUser = async (req, res = response) => {

	const { email, password } = req.body

	try {

		const user = await User.findOne({ email })


		if (!user) {
			return res.status(400).json({
				ok: false,
				message: `There is no user with email: [${email}].`
			})
		}

		//* Validating password
		const validPassword = bcrypt.compareSync(password, user.password)

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				message: `Password does not match.`
			})
		}

		// * Generate JWT
		const token = await generateJWT(user.id, user.name)


		res.status(201).json({
			ok: true,
			message: 'Login user',
			_id: user.id,
			name: user.name,
			token
		})

	} catch (error) {
		console.error(error)
		res.status(500).json({
			ok: false,
			message: 'Please, contact db admin'
		})
	}
}

const renewToken = async (req, res = response) => {

	const { name, uid } = req

	// * Generate JWT
	const token = await generateJWT(uid, name)

	res.status(201).json({
		ok: true,
		message: 'User token renewed',
		token
	})
}


module.exports = {
	createUser,
	loginUser,
	renewToken
}