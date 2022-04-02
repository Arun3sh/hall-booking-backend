import express, { request, response } from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import cors from 'cors';

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

app.put('/book-room/:id', (request, response) => {
	const data = request.body;
	console.log('incoming', data);
	response.send('Data received');
});

app.listen(PORT, () => console.log('Server started', PORT));
