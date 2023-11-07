import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

// import { utilService } from '../../services/util.service.js'

export const stationService = {
	remove,
	query,
	getById,
	add,
	update,
	// addStationMsg,
	// removeStationMsg,
}

async function query(filterBy) {
	try {
		const criteria = {
		
		}
		if (filterBy.txt) {
			criteria.name = { $regex: filterBy.txt, $options: 'i' };
		  }
		  
		  if (filterBy.isRecommended) {
			criteria.isRecommended = true;
		  }
		  
		  if (filterBy.genre) {
			criteria.tags = filterBy.genre;
		  }
		  
		  if (filterBy.user) {
			if (filterBy.liked) {
			  criteria['likedByUsers._id'] = filterBy.user._id;
			} else {
			  criteria['createdBy._id'] = filterBy.user._id;
			}
		  }

		const collection = await dbService.getCollection('station')
		var stationCursor = await collection.find(criteria)

		const stations = stationCursor.toArray()
		console.log(stations);
		return stations
	} catch (err) {
		logger.error('cannot find stations', err)
		throw err
	}
}

async function getById(stationId) {
	try {
		const collection = await dbService.getCollection('station')
		const station = collection.findOne({ _id: ObjectId(stationId) })
		return station
	} catch (err) {
		logger.error(`while finding station ${stationId}`, err)
		throw err
	}
}

async function remove(stationId) {
	try {
		const collection = await dbService.getCollection('station')
		await collection.deleteOne({ _id: ObjectId(stationId) })
		return stationId
	} catch (err) {
		logger.error(`cannot remove station ${stationId}`, err)
		throw err
	}
}

async function add(station) {
	console.log('hi');
	try {
		const collection = await dbService.getCollection('station')
		await collection.insertOne(station)
		return station
	} catch (err) {
		logger.error('cannot insert station', err)
		throw err
	}
}

async function update(station) {
	try {
		const stationToSave = {
			name: station.name,
			price: station.title,
			songs: station.songs,
			imgUrl: station.imgUrl,
			likedByUsers: station.likedByUsers,
			msgs:station.msgs
		}
		const collection = await dbService.getCollection('station')
		await collection.updateOne({ _id: ObjectId(station._id) }, { $set: stationToSave })
		return station
	} catch (err) {
		logger.error(`cannot update station ${station._id}`, err)
		throw err
	}
}

// async function addStationMsg(stationId, msg) {
// 	try {
// 		msg.id = utilService.makeId()
// 		const collection = await dbService.getCollection('station')
// 		await collection.updateOne({ _id: ObjectId(stationId) }, { $push: { msgs: msg } })
// 		return msg
// 	} catch (err) {
// 		logger.error(`cannot add station msg ${stationId}`, err)
// 		throw err
// 	}
// }

// async function removeStationMsg(stationId, msgId) {
// 	try {
// 		const collection = await dbService.getCollection('station')
// 		await collection.updateOne({ _id: ObjectId(stationId) }, { $pull: { msgs: { id: msgId } } })
// 		return msgId
// 	} catch (err) {
// 		logger.error(`cannot add station msg ${stationId}`, err)
// 		throw err
// 	}
// }
