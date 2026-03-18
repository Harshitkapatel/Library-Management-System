const express = require('express');
const books = require('../data/books.json')
const users = require('../data/users.json')

const router = express.Router()


/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of books in the system
 * Accesss: Public
 * Perameter: None
 */
router.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        data: books
    })
})


/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by its ID
 * Accesss: Public
 * Perameter: ID
 */
router.get('/:id', (req,res) => {

    //we are getting the ID from the perams
    //parseInt is used to convert the string id to a number because the id in the users.json is a number
    // const id = parseInt(req.params.id);
    const {id} = req.params

    //user find the all id and match the id with the parameter id
    const book = books.find((each) => each.id === id);

    if(!book){
      return  res.status(404).json({
            success:false,
            message: `Book not found by their givin ID : ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: book
    })
})


/**
 * Route: /books
 * Method: POST
 * Description: Add a new book to the system
 * Accesss: Public
 * Perameter: None
 */
router.post('/', (req,res) => {
    //we are getting the data from the body of the request
    const{id,name,author,year,genre,publisher,price} = req.body

    //we are checking if any of the required fields are missing
    if(!id || !name || !author || !year || !genre || !publisher || !price){
       return res.status(401).json({
            success: false,
            message: "Please provide all the required fields"
        })
    }

    //we are checking if the book already exists with the same id
    const book = books.find((each) => each.id === id )
    if(book){
        return res.status(406).json({
            success: false,
            message: `Book Already Exited with id:${id}`
        })
    }

    //if everything is fine then we will push the new user to the users array
    books.push({id, name, author, year, genre, publisher, price})

    //after pushing the new user to the users array we will send a response to the client    
    res.status(201).json({
        success: true,
        message: "Book Created Successfully"
    })
})


/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book by its ID
 * Accesss: Public
 * Perameter: ID
 */
router.put('/:id', (req, res) =>{
    //we are getting the ID from the perams 
    const {id} = req.params;

    //we are getting the data from the body of the request
    const {data} = req.body;

    //we cecking the data to update the book 
    // if(!data || Object.keys(data).length === 0){
    //     return res.status(400).json({
    //         success: false,
    //         message: "please provide the data to update"
    //     })
    // }

    //we are checking if the book exists with the same id
    const book = books.find((each) => each.id === id )
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found of ID:${id}`
        })
    }

    //if the book exists then we will update the book with the new data
    //we using spread operator
    const updatedBook = books.map((each) => {
        if(each.id === id){
            return{
                ...each,
                ...data,
            }
        }
        return each 
    })

    //after updating the book we will send a response to the client
    res.status(200).json({
        success: true,
        data: updatedBook,
        message: "Book Updated Successfully"
    })
})


/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Deleting a book by its ID
 * Accesss: Public
 * Parameter: ID
 */
router.delete('/:id', (req, res) =>{
    //we are getting the ID from the perams
    const {id} = req.params;

    //we are checking if the book exists with the same id
    const book = books.find((each) => each.id === id)
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found of id: ${id}`
        })
    }

    //if the book exists then we will delete the book from the books array
    const updatedBook = books.filter((each) => each.id !== id)

    //2nd method
    // const index = books.indexOf(book)
    // books.splice(index, 1)

    //after deleting the book we will send a response to the client
    res.status(200).json({
        success: true,
        data: updatedBook,
        message: "Books Deleted Successfully"
    })

})

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all the issued books
 * Accesss: Public
 * Parameter: None
 */
router.get('/issued/for-user', (req,res) => {
    const usersWithIssuedBooks = users.filter((each) => {
        if(each.issuedBook){
            return each;
        }
    })

    const issuedBooks = [];

    usersWithIssuedBooks.forEach((each) => {
        //we are finding the book which is issued by the user
        //we are converting the id to string because the id in the books.json is a number and the issuedBook in the users.json is a string
        const book =books.find((book) => (book.id) === (each.issuedBook));


        issuedBooks.push({
            ...book,
            issuedBy: each.name,
            issuedDate: each.issuedDate,
            returnDate: each.returnDate
        })
    })

    if(!issuedBooks === 0){
        return res.status(404).json({
            success: false,
            message: "No Books issued yet!"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    })
})




module.exports = router;