import express, { request, response } from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import { getRooms, getRoom, bookRoom, createNewRoom, userBookingInfo } from './helper.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// To create a connection between DB and api
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
	const client = new MongoClient(MONGO_URL);
	await client.connect();
	console.log('mongo');
	return client;
}

export const client = await createConnection();

app.get('/', (request, response) => {
	response.send('Hi');
});

//To get all the rooms available
app.get('/rooms', async (request, response) => {
	const result = await getRooms();
	response.send(result);
});

//To create new Room
app.post('/create-new-room', async (request, response) => {
	const data = request.body;
	const result = await createNewRoom(data);
	response.send(result);
});

//To get a room's booking data to check before booking
app.get('/book-room/:id', async (request, response) => {
	const { id } = request.params;
	const result = await getRoom(id);

	response.send(result[0]);
});

// To book room for user
app.put('/book-room/:id', async (request, response) => {
	const { id } = request.params;
	const data = request.body;
	const result = await bookRoom(id, data);

	// To save booked user info along with the room booked
	const user_booking = { room_id: data.id, date: data.date, from: data.from, to: data.to };
	const userResult = await userBookingInfo(data.name, user_booking);

	response.send({ bookroom: result, user_booking: userResult });
});

app.listen(PORT, () => console.log('Server started', PORT));
