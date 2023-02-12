const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/sort', upload.single('inputFile'), (req, res) => {
    const input = req.file.buffer.toString().split('\n').map(Number);
    const result = input.sort((a, b) => b - a);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename=result.txt');
    res.send(result.join('\n'));
});

app.listen(3000, () => {
    console.log('API is listening on port 3000');
});






