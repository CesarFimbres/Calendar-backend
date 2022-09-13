const { connect } = require('mongoose')

const dbConnection = async () => {

	try {
		await connect(process.env.DB_CONN,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
				// useCreateIndex: true
			})
		console.log('\x1b[32m DB Status :>>  Online \x1b[0m');
	}
	catch (error) {
		console.log('\x1b[31m DB Status :>>  Not connected \x1b[0m');
		console.log(error)
		throw new Error('\x1b[31m Has database connection error \x1b[0m')
	}
}


module.exports = {
	dbConnection
}