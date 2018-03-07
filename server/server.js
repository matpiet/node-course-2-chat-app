const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));


console.log(__dirname + '\\..\\public');
console.log(publicPath);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
