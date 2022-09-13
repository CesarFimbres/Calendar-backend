const { response } = require('express')
const bcrypt= require('bcryptjs')

const User = require('../db/models/user')

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
		user.password= bcrypt.hashSync(password, salt)

		await user.save()
		
		res.status(201).json({
			ok: true,
			message: 'New registered user',
			_id: user.id,
			name: user.name,
			email: user.email,
			password: user.password
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			ok: false,
			message: 'Please, contact db admin'
		})

	}
}



const loginUser = async(req, res = response) => {

	const { email, password } = req.body

	try {

		const user = await User.findOne({ email })

		console.log('user :>> ', user);

		if (!user) {
			return res.status(400).json({
				ok: false,
				message: `There is no user with email: [${email}] exist.`
			})
		}

		const validPassword = bcrypt.compareSync(password, user.password)

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				message: `Password does not match.`
			})
		}

		res.status(201).json({
			ok: true,
			message: 'Login user',
			_id: user.id,
			name: user.name
		})

	} catch (error) {
		console.error(error)
		res.status(500).json({
			ok: false,
			message: 'Please, contact db admin'
		})

	}
}

const renewToken = (req, res = response) => {
	res.status(201).json({
		ok: true,
		message: 'Renew token user'
	})
}


module.exports = {
	createUser,
	loginUser,
	renewToken
}