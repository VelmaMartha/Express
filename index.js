const express = require('express');
const path = require('path');
const moment = require('moment');
const req = require('express/lib/request');
const app = express();
var exphbs  = require('express-handlebars');

//handlebars middleware
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// //homepage Route
// app.get('/', (req, res) => res.render('index', {
//     title: 'Member App'
// }));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//middleware
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}
//init middlewear
app.use(logger);

//set static folder
app.use(express.static(path.join(__dirname,'public')))

//members Api routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));