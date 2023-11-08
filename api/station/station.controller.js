import { Socket } from 'socket.io'

import { stationService } from './station.service.js'
import { logger } from '../../services/logger.service.js'

export async function getStations(req, res) {
	try {
		logger.debug('Getting Stations:', req.query)
		const filterBy = {
			txt: req.query.txt || '',
			isRecommended: req.query.isRecommended || false,
			user: req.query.user || false,
			genre: req.query.genre || false,
			liked: req.query.liked || false,
		}

		const stations = await stationService.query(filterBy)
		res.json(stations)
	} catch (err) {
		logger.error('Failed to get stations', err)
		res.status(400).send({ err: 'Failed to get stations' })
	}
}

export async function getStationById(req, res) {
	try {
		const stationId = req.params.id
		const station = await stationService.getById(stationId)
		res.json(station)
	} catch (err) {
		logger.error('Failed to get station', err)
		res.status(400).send({ err: 'Failed to get station' })
	}
}

export async function addStation(req, res) {
	const { loggedinUser } = req

	try {
		const station = req.body
		station.createdBy = loggedinUser
		const addedStation = await stationService.add(station)
		res.json(addedStation)
	} catch (err) {
		logger.error('Failed to add station', err)
		res.status(400).send({ err: 'Failed to add station' })
	}
}

export async function updateStation(req, res) {
	const { loggedinUser } = req

	try {
		const station = req.body
		const updatedStation = await stationService.update(station)
		res.json(updatedStation)
	} catch (err) {
		logger.error('Failed to update station', err)
		res.status(400).send({ err: 'Failed to update station' })
	}
}

export async function removeStation(req, res) {
	try {
		const stationId = req.params.id
		const removedId = await stationService.remove(stationId)
		res.send(removedId)
	} catch (err) {
		logger.error('Failed to remove station', err)
		res.status(400).send({ err: 'Failed to remove station' })
	}
}
