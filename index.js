const express = require('express');
var cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const PORT = process.env.PORT || 4001;

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.get('/', (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    setTimeout(loop, 10000);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


//setTimeout(loop, 10000);

function loop() {
    console.log('Started timer');
    console.log('Before sending');
    const AirQualitySensor = require('./AirQualitySensor')
    const airQualitySensor = new AirQualitySensor();
    airQualitySensor.addNewMeasurementData();
    io.emit('New Measurement', airQualitySensor);
    console.log(airQualitySensor);
    setTimeout(loop, 10000);
}

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});