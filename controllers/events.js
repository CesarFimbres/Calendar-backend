
const { response } = require('express')
const Event = require('../db/models/event')

const createEvent = async (req, res = response) => {

	const event = new Event(req.body)

	try {
		event.user = req.uid
		const savedEvent = await event.save()
		res.status(201).json({
			ok: true,
			message: 'The request has been fulfilled and resulted in a new resource being created.',
			event: savedEvent
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			message: 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
		})
	}
}

const readEvents = async (req, res = response) => {

	const events = await Event.find()
		.populate('user', 'name email')

	res.json(
		{
			ok: true,
			message: 'The request has succeeded',
			events
		}
	)
}

const updateEvent = async (req, res = response) => {
	const eventId = req.params.id
	const uid = req.uid

	try {
		const event = await Event.findById(eventId)
		
		if (!event) {
			return res.status(404).json({
				ok: false,
				message: `No results found for your search (id: ${eventId})`
			})
		}

		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				message: `You don't have enough credentials to edit this record`
			})
		}

		const newEvent = {
			...req.body,
			user: uid
		}

		const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

		res.json(
			{
				ok: true,
				message: 'The record was updated successfully',
				eventUpdated
			}
		)
	}
	catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			message: 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
		})
	}
}

const deleteEvent = async (req, res = response) => {
	const eventId = req.params.id
	const uid = req.uid

	try {
		const event = await Event.findById(eventId)

		if (!event) {
			return res.status(404).json({
				ok: false,
				message: `No results found for your search (id: ${eventId})`
			})
		}

		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				message: `You don't have enough credentials to delete this record`
			})
		}

		const eventDeleted = await Event.findByIdAndDelete( eventId )

		res.json(
			{
				ok: true,
				message: 'The record was deleted successfully',
				eventDeleted
			}
		)
	}
	catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			message: 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
		})
	}
}


module.exports = {
	createEvent,
	readEvents,
	updateEvent,
	deleteEvent
}