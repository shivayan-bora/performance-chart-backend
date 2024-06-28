const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = './db.json';

const app = express();
const port = 3000;

let data = {
	load: [],
	errors: [],
	success: []
};

// Function to clear the db.json file
function clearData() {
	data = {
		load: [],
		errors: [],
		success: []
	};
	fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
}

// Function to generate random data for multiple metrics
function generateRandomData() {
	const currentDate = new Date();
	const loadValue = Math.floor(Math.random() * 100);
	const errorValue = Math.floor(Math.random() * 20);
	const successValue = Math.floor(Math.random() * 100);

	const newLoadData = { date: currentDate.toISOString(), value: loadValue };
	const newErrorData = { date: currentDate.toISOString(), value: errorValue };
	const newSuccessData = { date: currentDate.toISOString(), value: successValue };

	data.load.push(newLoadData);
	data.errors.push(newErrorData);
	data.success.push(newSuccessData);

	fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');

	return { load: newLoadData, errors: newErrorData, success: newSuccessData };
}

// Clear the data when the server starts
clearData();

// Generate new data every 6 seconds
setInterval(generateRandomData, 6000);

app.use(cors()); // Enable CORS for all routes

app.use('/data', (req, res) => {
	const latestDataPoints = generateRandomData();
	res.send(latestDataPoints);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
