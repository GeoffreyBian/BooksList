import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to save a new book
router.post('/', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Not all information provided',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//getting books from the database
router.get('/', async (request, response) => {
    try{
        const books = await Book.find({});
        return response.status(200).send({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//getting one book from the database
router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).send({ message: 'Book not found' });
        }
        return response.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//update a book
router.put('/:id', async (request, response) => {
    try{
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Not all required fields inputted",
            });
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Book not found'});
        }

        return response.status(200).send({ message: 'Book is updated!'});
    } catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

//deleted a book
router.delete('/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        else {
            return response.status(200).send({message: 'Book deleted!'});
        }
    } catch(error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;