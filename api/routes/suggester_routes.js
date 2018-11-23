module.exports = function(app){
	var bookController = require('../controllers/book_controller');

	app.route('/books')
		.get(bookController.book_list)
		.post(bookController.add_a_book);

	//this route must come first or 'random' will be used as :bookId and throw error
	app.route('/books/random')
		.get(bookController.view_random_book);

	app.route('/books/:bookId')
		.get(bookController.view_book_details)
		.put(bookController.update_book_details)
		.delete(bookController.delete_a_book);

};