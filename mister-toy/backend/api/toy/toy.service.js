// const gToys = require('../../data/toy.json')
const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find().toArray()
        toys = toys.map(toy => {
            delete toy.password
            // toy.isHappy = true
            // toy.createdAt = ObjectId(toy._id).getTimestamp()
            // Returning fake fresh data
            // toy.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return toy
        })
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        delete toy.password

        // toy.givenReviews = await reviewService.query({ byUserId: ObjectId(toy._id) })
        // toy.givenReviews = toy.givenReviews.map(review => {
        //     delete review.byUser
        //     return review
        // })

        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const toyToAdd = {
            name: toy.name,
            price: toy.price,
            type: toy.type,
            createdAt: Date.now(),
            inStock: true
        }
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            _id: ObjectId(toy._id),
            name: toy.name,
            price: toy.price,
            type: toy.type,
            inStock: true
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}