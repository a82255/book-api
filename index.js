const express = require('express'); // express is both a library and a module. Here it becomes a reference to an exported function of that library.
const fs = require('fs');
const path = require('path');
const cors = require("cors");

const app = express(); // express() is function that we gost imported from the library. It returns a new app we are going to use in this api.
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(cors({
	origin: 'http://localhost:4200'
}));

// Helper function to load JSON data from file
const readDataFromFile = (filename) => {
	const data = fs.readFileSync(path.join(__dirname, filename));
	return JSON.parse(data);
}

// Helper function to save JSON data to file
const writeDataToFile = (filename, data) => {
	fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(data, null, 2));
}

// Tag Endpoints
// Get all Tags
app.get('/api/tags', (req, res) => {
	const tags = readDataFromFile('tags.json');
	res.json(tags);
});
// Get a secific Tag
app.get('/api/tags/:id', (req, res) => {
	const tags = readDataFromFile('tags.json');
	const tag = tags.find(t => t.id === parseInt(req.params.id));
	if (tag) {
		res.json(tag);
	} else {
		res.status(404).send('Tag no found');
	}
});
// Create a new Tag
app.post('/api/tags', (req, res) => {
	let tags = readDataFromFile('tags.json');
	let id = tags.length === 0 || tags[0].id !== 1 ? 1 : tags[tags.length - 1].id + 1;
	tags.find((t, i) => {
		if (tags[0].id !== 1) {
			return true;
		}
		if ((t.id - 1) === i) {
			return false;
		}
		id = tags[i - 1].id + 1;
		return true;
	});
	const newTag = {
		id: id,
		description: req.body.description
	};
	tags.push(newTag);
	tags = tags.sort((a, b) => a.id - b.id);
	writeDataToFile('tags.json', tags);
	res.status(201).json(newTag);
});
// Delete a Tag
app.delete('/api/tags/:id', (req, res) => {
	const tags = readDataFromFile('tags.json');
	const id = req.params.id;
	// delete the tag from the list
	let obj = tags.find(e => e.id == id);
	if (obj == null) {
		res.status(404).send({ message: "Tag not found." });
		return;
	}
	let index = tags.indexOf(obj);
	tags.splice(index, 1);
	writeDataToFile('tags.json', tags);
	// send success response
	res.status(200).send({ message: "Tag deleted successfuly." });
});

// Books
// Get all Books
app.get('/api/books', (req, res) => {
	let books = readDataFromFile('books.json');
	let tags = readDataFromFile('tags.json');
	books.forEach(book => {
		t = [];
		book.tags.forEach(tagId => {
			t.push(...tags.filter(t => t.id == tagId));
		});
		book.tags = t;
	});
	res.json(books);
});

// Get a specific books by id
app.get('/api/books/:id', (req, res) => {
	const books = readDataFromFile('books.json');
	const book = books.find(b => b.id === parseInt(req.params.id));
	if (book) {
		req.json(book);
	} else {
		res.status(404).send('Book not found');
	}
});

// Create a new Book
app.post('/api/books', (req, res) => {
	let books = readDataFromFile('books.json');

	let id = books.length;
	if (id === 0) {
		id = 1;
	} else if (books.length === 1 && books[0].id !== 1) {
		id = 1;
	} else {
		id = books[books.length - 1].id+1;
	}
	const newBook = {
		id: id,
		title: req.body.title,
		author: req.body.author,
		tags: req.body.tags,
		price: req.body.price,
		discount: req.body.discount
	};
	books.push(newBook);
	books.sort((a, b) => a.id - b.id);
	writeDataToFile('books.json', books);
	res.status(201).json(newBook);
});

// Update an Existing Book
app.put('/api/books/:id', (req, res) => {
	const books = readDataFromFile('books.json');
	const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
	console.log(req.params.id);
	if (bookIndex !== -1) {
		const updatedBook = {
			...books[bookIndex],
			title: req.body.title,
			author: req.body.author,
			tags: req.body.tags,
			price: req.body.price,
			discount: req.body.discount
		};
		books[bookIndex] = updatedBook;
		writeDataToFile('books.json', books);
		res.json(updatedBook);
	} else {
		res.status(404).send('Book not found');
	}
});

// Delete a Book
app.delete('/api/books/:id', (req, res) => {
	const books = readDataFromFile('books.json');
	const id = req.params.id;
	// delete the tag from the list
	let obj = books.find(e => e.id == id);
	if (obj == null) {
		res.status(404).send({ message: "book not found." });
		return;
	}
	let index = books.indexOf(obj);
	books.splice(index, 1);
	writeDataToFile('books.json', books);
	// send success response
	res.status(200).send({ message: "book deleted successfuly." });
});

app.listen(PORT, () => { // the app needs to listen to a port to run. without a port it cannot run.
	console.log(`Server running at https://localhost:${PORT}`);
});
