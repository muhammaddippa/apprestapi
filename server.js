const express = require('express');
const bodyParser = require('body-parser');

var morgan = require('morgan');
const app = express();

//parse aplikasi json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//panggil routes
var routes = require('./routes');
routes(app);

//daftarkan menu routes dari index
app.use('/auth', require('./middleware'))

app.listen(4099, () => {
    console.log(`Server started`);
});