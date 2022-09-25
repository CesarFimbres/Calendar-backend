/*
CRUD routes - Events
host + api / events

All routes have to pass throw JWT validation 
*/

const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate-fields')
const { isDate } = require( '../helpers/isDate' )
const { validateJWT } = require('../middlewares/validate-jwt')
const {
	createEvent,
	readEvents,
	updateEvent,
	deleteEvent
} = require('../controllers/events')

const router = Router()


// All routes bellow this, take JWT validation
router.use( validateJWT )

// Create events
router.post('/',
	[
		check( 'title', 'Field title is required ' ).not().isEmpty(),
		check('start', 'Field start-date is required ').custom( isDate ),
		check('end', 'Field end-date is required ').custom(isDate),
		validateFields
	],
	createEvent
)

// Read events
router.get('/', readEvents)

// Update events
router.put('/:id',
	[
		check('title', 'Field title is required ').not().isEmpty(),
		check('start', 'Field start-date is required ').custom(isDate),
		check('end', 'Field end-date is required ').custom(isDate),
		validateFields
	],
	updateEvent)

// Delete events
router.delete('/:id', deleteEvent)


module.exports = router
