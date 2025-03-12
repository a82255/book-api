# Express API Documentation
Note: enerated with ChatGPT.

## Overview
This API provides endpoints for managing books and tags. The data is stored in JSON files and handled using Express.

## Installation
1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone the repository or download the project files.
3. Navigate to the project directory and run:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   node server.js
   ```
   The API will be available at `http://localhost:3000`.

## Endpoints

### Tags Endpoints

#### Get all tags
**GET** `/api/tags`
- Returns a list of all tags.

#### Get a specific tag
**GET** `/api/tags/:id`
- Returns a tag by its ID.
- **Response:**
  - `200 OK` with the tag object if found.
  - `404 Not Found` if the tag does not exist.

#### Create a new tag
**POST** `/api/tags`
- Creates a new tag.
- **Request Body:**
  ```json
  {
    "description": "Tag description"
  }
  ```
- **Response:**
  - `201 Created` with the new tag object.

#### Delete a tag
**DELETE** `/api/tags/:id`
- Deletes a tag by ID.
- **Response:**
  - `200 OK` if successful.
  - `404 Not Found` if the tag does not exist.

### Books Endpoints

#### Get all books
**GET** `/api/books`
- Returns a list of all books with their associated tags.

#### Get a specific book
**GET** `/api/books/:id`
- Returns a book by its ID.
- **Response:**
  - `200 OK` with the book object if found.
  - `404 Not Found` if the book does not exist.

#### Create a new book
**POST** `/api/books`
- Creates a new book.
- **Request Body:**
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "tags": [1, 2],
    "price": 19.99,
    "discount": 10
  }
  ```
- **Response:**
  - `201 Created` with the new book object.

#### Update a book
**PUT** `/api/books/:id`
- Updates an existing book.
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author",
    "tags": [1, 3],
    "price": 24.99,
    "discount": 5
  }
  ```
- **Response:**
  - `200 OK` with the updated book object.
  - `404 Not Found` if the book does not exist.

#### Delete a book
**DELETE** `/api/books/:id`
- Deletes a book by ID.
- **Response:**
  - `200 OK` if successful.
  - `404 Not Found` if the book does not exist.

## CORS Configuration
The server allows cross-origin requests from `http://localhost:4200` by using the `cors` middleware:

## Notes
- The data is stored in `books.json` and `tags.json` files.
- ID generation logic ensures uniqueness but may need improvements for large datasets.

## License
This project is open-source and free to use.


