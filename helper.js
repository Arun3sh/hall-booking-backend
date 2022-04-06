import { client } from './index.js';
import { ObjectId } from 'mongodb';

async function getRooms() {
	return await client
		.db('hall-booking')
		.collection('roomdata')
		.find({}, { projection: { booking_details: 0 } })
		.toArray();
}

async function getRoom(id) {
	return await client
		.db('hall-booking')
		.collection('roomdata')
		.find(
			{ _id: ObjectId(id) }
			// { projection: { _id: 0, room_id: 0, price: 0, seat: 0, chair: 0, tv: 0, wifi: 0, table: 0 } }
		)
		.toArray();
}

async function getCustomer() {
	return await client
		.db('hall-booking')
		.collection('user')
		.find({}, { projection: { booking_details: 0 } })
		.toArray();
}

async function getCustomerBooking(id) {
	return await client
		.db('hall-booking')
		.collection('user')
		.find({ _id: ObjectId(id) })
		.toArray();
}

async function bookRoom(id, booking_details) {
	return await client
		.db('hall-booking')
		.collection('roomdata')
		.updateOne(
			{ _id: ObjectId(id) },
			{ $push: { booking_details: booking_details } },
			// {
			// 	arrayFilters: [
			// 		{ 't.booking_details.date': booking_details.date },
			// 		{ 'booking_details.to': { $lt: booking_details.from } },
			// 	],
			// }
			{ upsert: true }
		);
}

async function createNewRoom(data) {
	return await client.db('hall-booking').collection('roomdata').insertMany(data);
}

async function userBookingInfo(name, user_booking) {
	return await client
		.db('hall-booking')
		.collection('user')
		.updateOne({ name: name }, { $push: { booking_details: user_booking } }, { upsert: true });
}

export {
	getRooms,
	getRoom,
	getCustomer,
	getCustomerBooking,
	bookRoom,
	createNewRoom,
	userBookingInfo,
};
