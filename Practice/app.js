const path = require('path');
const express = require('express');
const cv = require('opencv4nodejs');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var ba64 = require("ba64");
const FPS = 40;

const wCap = new cv.VideoCapture(0);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));

});

setInterval(() => {
    const frame = wCap.read();
    const image = cv.imencode('.jpg', frame).toString('base64');
    var data_url = `data:image/jpeg;base64,${image}`;

    // Save the image synchronously.
    ba64.writeImageSync("myimage", image); // Saves myimage.jpeg.

    // Or save the image asynchronously.
    ba64.writeImage("myimage", data_url, function (err) {
        if (err) throw err;

        console.log("Image saved successfully");

        // do stuff
    });
    io.emit('image', image);
}, 1000 / FPS)

server.listen(3000);