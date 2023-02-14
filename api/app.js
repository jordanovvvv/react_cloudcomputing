const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.text({ type: 'text/plain' }));

app.post('/sort', upload.single('inputFile'), (req, res) => {
    const input = req.file.buffer.toString().split('\n').map(Number);
    const result = input.sort((a, b) => b - a);
    const resultText = result.join('\n');
    fs.writeFile('result.txt', resultText, (err) => {
        if(err) throw err;
        res.send('File succesfully sorted!');
    });
    res.set('Content-Type', 'text/plain');
    res.send(resultText);
});

app.get('/result', (req, res) => {
    fs.readFile('result.txt', (err, data) => {
        if (err) throw err;
        res.set('Content-Type', 'text/plain');
        res.send(data.toString());
    });
});

app.listen(3000, () => {
    console.log('API is listening on port 3000');
});






