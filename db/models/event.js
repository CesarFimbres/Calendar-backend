const { Schema, model} = require('mongoose')

const eventSchema = new Schema({

	title: {
		type: String,
		required: true
	},	
	notes: {
		type: String,
	},
	start: {
		type: Date,
		required: true
	},
	end: {
		type: Date,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}

})

eventSchema.method('toJSON', function () {
	const { _id, __v, ...dbo } = this.toObject()
	dbObject = {id: _id, ...dbo}
	return dbObject
} )


module.exports = model('Event', eventSchema);