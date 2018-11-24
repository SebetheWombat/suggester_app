var mongoose = require('mongoose'),
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
	var searchStatus = parseStatus(req.body);
	var searchTags = parseTags(req.body);

	Book.count({status: searchStatus, tags: { $in: searchTags }}, function(err,count){
		// console.log(count);
		var rand = Math.floor(Math.random()*count);
		// console.log("random: " + rand);

		//Uses cursor.skip() method to start search at different secionts in db based on random value
		Book.findOne({status: searchStatus, tags: { $in: searchTags }}).skip(rand).exec(function(err,book){
			if(err){
				res.send(err);
			}
			res.json(book);
		});
	});	
};

exports.search = function(req,res) {
	//If nodes are missing or empty act as though no filter were added by searching all patterns
	//tags and status are stored as lowercase. Convert input to lowercase for accurate search
	var searchStatus = parseStatus(req.body);
	var searchTags = parseTags(req.body);

	//TODO: research $in vs $elemMatch
	Book.find({status: searchStatus, tags: { $in: searchTags }}, function(err, book){
		if(err){
			res.send(err);
		}
		res.json(book);
	});
};	

//Should these helpers be in different document?
var parseStatus = function(obj){
	var searchStatus = obj['status'];
	if(searchStatus === undefined || searchStatus === ""){
		searchStatus = /./;
	}else{
		searchStatus = searchStatus.toLowerCase();
	}
	return searchStatus;
}

var parseTags = function(obj){
	var searchTags = obj['tags'];
	if(searchTags === undefined || searchTags.constructor.name !== "Array" || searchTags.length === 0){
		searchTags = [/./];
	}else{
		searchTags = searchTags.map(s => {return s.toLowerCase()});
	}
	return searchTags;
}
