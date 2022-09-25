const moment = require('moment')

const isDate = (value, { req, location, path }) => {

	/*
	console.log('___REQUEST.BODY____________________________________________')
	console.log('req.body :>> ', req.body);
	console.log('___REQUEST.PARAMS__________________________________________')
	console.log('req.params :>> ', req.params);
	console.log('___________________________________________________________')
*/
	
	if ( !value ) {
		return false
	}

	const date = moment(value)
	if ( date.isValid() ) {
		return true
	}

}


module.exports = { isDate }