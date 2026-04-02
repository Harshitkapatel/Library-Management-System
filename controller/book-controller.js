const {bookModel, userModel} = require("../model/index")
const IssuedBook = require("../dtos/book-dto")


// router.get('/', (req,res) => {
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// }) ()
exports.getAllData = async (req, res) => {
    const books = await bookModel.find()

    if(books.length === 0){
        return res.status.json({
            success: false,
            message: "No Books in the system"
        })
    }

    res.status(200).json({
        success: true,
        data: books
    })

}


// router.get('/:id', (req,res) => {
//     const {id} = req.params
//     const book = books.find((each) => each.id === id);

//     if(!book){
//       return  res.status(404).json({
//             success:false,
//             message: `Book not found by their givin ID : ${id}`
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: book
//     })
// })
exports.getSingleBookById = async (req, res) => {
    const {id} = req.params
    const book = await bookModel.find((each) => each.id === id);

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

}


// router.get('/issued/for-user', (req,res) => {
//     const usersWithIssuedBooks = users.filter((each) => {
//         if(each.issuedBook){
//             return each;
//         }
//     })

//     const issuedBooks = [];

//     usersWithIssuedBooks.forEach((each) => {
//         //we are finding the book which is issued by the user
//         //we are converting the id to string because the id in the books.json is a number and the issuedBook in the users.json is a string
//         const book =books.find((book) => (book.id) === (each.issuedBook));


//         issuedBooks.push({
//             ...book,
//             issuedBy: each.name,
//             issuedDate: each.issuedDate,
//             returnDate: each.returnDate
//         })
//     })

//     if(!issuedBooks === 0){
//         return res.status(404).json({
//             success: false,
//             message: "No Books issued yet!"
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBooks
//     })
// })
exports.getAllIssuedBook = async (req, res) => {
    const users = await userModel.find({
        issuedBook: {$exists: true}
    }).populate("issuedBook")

    const issuedBooks = users.map((each) => {
        return new IssuedBook(each)
    })

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message: "No Books issued yet!"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    })
    

}


// router.post('/', (req,res) => {
//     //we are getting the data from the body of the request
//     const{id,name,author,year,genre,publisher,price} = req.body

//     //we are checking if any of the required fields are missing
//     if(!id || !name || !author || !year || !genre || !publisher || !price){
//        return res.status(401).json({
//             success: false,
//             message: "Please provide all the required fields"
//         })
//     }

//     //we are checking if the book already exists with the same id
//     const book = books.find((each) => each.id === id )
//     if(book){
//         return res.status(406).json({
//             success: false,
//             message: `Book Already Exited with id:${id}`
//         })
//     }

//     //if everything is fine then we will push the new user to the users array
//     books.push({id, name, author, year, genre, publisher, price})

//     //after pushing the new user to the users array we will send a response to the client    
//     res.status(201).json({
//         success: true,
//         message: "Book Created Successfully"
//     })
// })
exports.addNewBook = async(req, res) => {
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to add a new book"
        })
    }

    await bookModel.create(data);
    //get only updated book after adding the new book
    // res.status(201).json({
    //     success: true,
    //     message: "Book Created Successfully"
    //     data: data
    // })

    //get all the books after adding the new book
    const allBooks = await bookModel.find();
    res.status(201).json({
        success: true,
        message: "Book Created Successfully",
        data: allBooks
    })    
}


// router.put('/:id', (req, res) =>{
//     //we are getting the ID from the perams 
//     const {id} = req.params;

//     //we are getting the data from the body of the request
//     const {data} = req.body;

//     //we cecking the data to update the book 
//     // if(!data || Object.keys(data).length === 0){
//     //     return res.status(400).json({
//     //         success: false,
//     //         message: "please provide the data to update"
//     //     })
//     // }

//     //we are checking if the book exists with the same id
//     const book = books.find((each) => each.id === id )
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found of ID:${id}`
//         })
//     }

//     //if the book exists then we will update the book with the new data
//     //we using spread operator
//     const updatedBook = books.map((each) => {
//         if(each.id === id){
//             return{
//                 ...each,
//                 ...data,
//             }
//         }
//         return each 
//     })

//     //after updating the book we will send a response to the client
//     res.status(200).json({
//         success: true,
//         data: updatedBook,
//         message: "Book Updated Successfully"
//     })
// })
exports.updateBookById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message:"Please provide the data to update the book"
        })
    }

//method 1
//     const book =await bookModel.findById(id);
//     if(!book){
//         return res.status(400).json({
//             success: false,
//             message: `Book not found of ID:${id}`
//         })
//     }

//     Object.assign(book, data);
//     await book.save();

//     res.status(200).json({
//         success: true,
//         data: book,
//         message: "Book Updated Successfully"
//     })


//method 2
    const updatedBook = await bookModel.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
    );

    if(!updatedBook){
        return res.status(400).json({
            success: false,
            message: `Book not found of ID:${id}`
        })
    }
    
    res.status(200).json({
        success: true,
        data: updatedBook,
        message: "Book Updated Successfully"
    })


}


// router.delete('/:id', (req, res) =>{
//     //we are getting the ID from the perams
//     const {id} = req.params;

//     //we are checking if the book exists with the same id
//     const book = books.find((each) => each.id === id)
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found of id: ${id}`
//         })
//     }

//     //if the book exists then we will delete the book from the books array
//     const updatedBook = books.filter((each) => each.id !== id)

//     //2nd method
//     // const index = books.indexOf(book)
//     // books.splice(index, 1)

//     //after deleting the book we will send a response to the client
//     res.status(200).json({
//         success: true,
//         data: updatedBook,
//         message: "Books Deleted Successfully"
//     })

// })
exports.deleteBookById = async (req, res) => {
    const {id} = req.params;

//method 1
    const book = await bookModel.findById(id);
    if(!book){
        return res.status(400).json({
            success: false,
            message: `Book not found of ID:${id}`
        })
    }

    await bookModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message:" Book Deleted Successfully"
    })

//method 2
    // const deletedBook = await bookModel.findOneAndDelete(
    //     {_id: id}
    // )

    // if(!deletedBook){
    //     res.status(400).json({
    //         success: false,
    //         message: `Book not found of Id:${id}`
    //     })
    // }

    // res.ststus(200).json({
    //     success: true,
    //     message:"Book Deleted Successfully",
    //     data: deletedBook
    // })
}