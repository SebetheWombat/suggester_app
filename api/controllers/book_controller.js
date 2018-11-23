var mongoose = require('mongoose'),
	url = require('url'),
	Book = mongoose.model('Books');

exports.book_list = function(req,res) {
	Book.find({}, function(err, book){
		if(err){
			res.send(err);
		}
		res.json(book);
	});
};

exports.add_a_book = function(req,res) {
	var new_book = new Book(req.body);
	new_book.save(function(err,book){
		if(err){
			res.send(err);
		}
		res.json(book);
	});
};

exports.view_book_details = function(req, res) {
	Book.findById(req.params.bookId, function(err,book){
		if(err){
			res.send(err);
		}
		res.json(book);
	});
};

exports.update_book_details = function(req, res) {
	Book.findByIdAndUpdate(req.params.bookId, req.body, {new:true}, function(err,book){
		if(err){
			res.send(err);
		}
		res.json(book);
	});
};

exports.delete_a_book = function(req, res) {
	Book.findByIdAndDelete(req.params.bookId, function(err,book){
		if(err){
			res.send(err);
		}
		res.json({message: "Book successfully deleted"});
	});
};

exports.view_random_book = function(req, res) {
	Book.count().exec(function(err,count){
		var rand = Math.floor(Math.random()*count);

		Book.findOne().skip(rand).exec(function(err,book){
			if(err){
				res.send(err);
			}
			res.json(book);
		});
	});	
};

exports.search = function(req,res) {
	var queryStatus = url.parse(req.url, true);
	queryStatus = queryStatus.query;
	console.log(queryStatus);
	Book.find(queryStatus, function(err, book){
		if(err){
			res.send(err);
		}
		res.json(book);
	});
};	

