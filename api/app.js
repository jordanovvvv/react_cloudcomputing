const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const path = require('path');
const archiver = require('archiver');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cors = require('cors');


app.use(bodyParser.text({ type: 'text/plain' }));
app.use(cors);

app.post('/sort', upload.array('inputFiles'), (req, res) => {

    const input = req.files;
    const contents = [];

    input.forEach((file) => {
        const fileContents = fs.readFileSync(file.path, { encoding: "utf8" });
        const numbers = fileContents
            .trim()
            .split("\n")
            .map((line) => parseInt(line, 10))
            .filter((number) => !isNaN(number));
        contents.push(...numbers);
        fs.unlinkSync(file.path);
    });

    const output = archiver("zip", {
        zlib: { level: 9 },
    });

    output.append(contents.join("\n"), { name: "result.txt" });
    output.finalize();

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=result.zip");
    output.pipe(res);
});


app.get('/download', (req, res) => {
    const zipFilePath = __dirname + '/result';
    res.download(zipFilePath, 'result.txt', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: could not download file');
        } else {
            console.log('File download successful');
        }
    });
});

app.listen(3000, () => {
    console.log('API is listening on port 3000');
});






