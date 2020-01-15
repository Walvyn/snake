"use strict";

// Mongodb Client
const mongo = require("mongodb").MongoClient;

// Co module, used for managing generators
const co = require('co');

function Database(){}

Database.prototype.connect = co.wrap(function *({url, params = {}}){
	try {
		return Promise.resolve(yield mongo.connect(url, params));
	} catch(err) {
		throw { type: 'ERROR_CONNECT', error: err};
	}
});

Database.prototype.getAll = co.wrap(function *({db, collection, options = {}, params = {}}){
	const col = db.collection(collection);

	try {
		return Promise.resolve(yield col.find(params, options).toArray());
	} catch(err) {
		throw { type: 'ERROR_QUERY', error: err, details: {collection: collection}};
	}
});

Database.prototype.getOne = co.wrap(function *({db, collection, options = {}, params = {}}){
	const col = db.collection(collection);

	try {
		return Promise.resolve(yield col.findOne(params, options));
	} catch(err) {
		throw { type: 'ERROR_QUERY', error: err, details: {collection: collection}};
	}
});

Database.prototype.distinct = co.wrap(function *({db, collection, field, sort = {}, params = {}}){
	const col = db.collection(collection);

	try {
		let results = yield col.distinct(field, params);
		return Promise.resolve(results.sort(sort));
	} catch(err) {
		throw { type: 'ERROR_QUERY', error: err, details: {collection: collection}};
	}
});

Database.prototype.count = co.wrap(function *({db, collection, params = {}}){
	const col = db.collection(collection);

	try {
		return Promise.resolve(yield col.count(params));
	} catch(err) {
		throw { type: 'ERROR_QUERY', error: err, details: {collection: collection}};
	}
});

Database.prototype.addOne = co.wrap(function *({db, collection, data, options = {}}){
	const col = db.collection(collection);

	try {
		return Promise.resolve(yield col.insertOne(data, options));
	} catch(err) {
		throw { type: 'ERROR_QUERY', error: err, details: {collection: collection}};
	}
});

Database.prototype.addMany = co.wrap(function *({db, collection, data, options = {}}){
	const col = db.collection(collection);

	try {
		return Promise.resolve(yield col.insertMany(data, options));
	} catch(err) {
		throw { type: 'ERROR_QUERY', error: err, details: {collection: collection}};
	}
});

Database.prototype.setAll = co.wrap(function *({db, collection, params = {}, update = {}}){
	const col = db.collection(collection);

	try {
		return Promise.resolve(yield col.updateMany(params, { $set: update }));
	} catch(err) {
		throw { type: 'ERROR_QUERY', error: err, details: {collection: collection}};
	}
});

Database.prototype.update = co.wrap(function *({db, collection, params = {}, update = {}}){
	const col = db.collection(collection);

	try {
		return Promise.resolve(yield col.update(params, update));
	} catch(err) {
		throw { type: 'ERROR_QUERY', error: err, details: {collection: collection}};
	}
});

Database.prototype.delete = co.wrap(function *({db, collection, params = {}}){
	const col = db.collection(collection);

	try {
		return Promise.resolve(yield col.deleteMany(params));
	} catch(err) {
		throw { type: 'ERROR_QUERY', error: err, details: {collection: collection}};
	}
});

Database.prototype.drop = co.wrap(function *({db, collection}){
	const col = db.collection(collection);

	try {
		return Promise.resolve(yield col.drop());
	} catch(err) {
		throw { type: 'ERROR_QUERY', error: err, details: {collection: collection}};
	}
});

Database.prototype.executeBulk = co.wrap(function *({bulk, params = {}}){
	try {
		if (bulk.s.namespace) {
			winston.log('debug', 'Executing bulk ' + bulk.s.namespace);
		}
		if (bulk.length) {
			return Promise.resolve(yield bulk.execute(params));
		} else {
			return Promise.resolve(true);
		}
	} catch(err) {
		throw { type: 'ERROR_BULK', error: err, details: {collection: bulk.s.namespace}};
	}
});

Database.prototype.createSearchFilter = ({fields = []}) => {
	return fields.reduce((acc, field) => {
		let obj = {};
		obj[field] = new RegExp(global.query.search, 'i');
		acc.push(obj);
		return acc;
	}, []);
};

module.exports = new Database();
