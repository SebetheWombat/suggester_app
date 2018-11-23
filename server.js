const express = require('express'),
	app = express(),
	port = 3000,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	Book = require('./api/models/book_model');

//Mongo connection instance
const mongo = 'mongodb://127.0.0.1/suggester_db';
mongoose.connect(mongo);
mongoose.Promise = global.Promise;


//What does this do? Something about middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const routes = require('./api/routes/suggester_routes');
routes(app);

//inform user path wasn't found for 404 response status
app.use(function(req, res){
	res.status(404).send({message: req.originalUrl + ' not found'});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));