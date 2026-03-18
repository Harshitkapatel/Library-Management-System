const express = require('express');
// const users  = require('./data/users.json');


//importing the routes
const usersRouter = require('./routes/users.js');
const booksRouter = require('./routes/books.js'); 


const app = express();

const PORT = 8081;

app.use(express.json())

app.get('/',(req,res) =>{
    res.status(200).json({
        message: "Home Page :-)"
    })
}) 

//using the routes 
app.use("/users", usersRouter);
app.use("/books", booksRouter);




// app.all('*', (req,res) => {
//     res.status(500).json({
//         message: "Not Built yet"
//     })
// })


app.listen(PORT, ()=>{
    console.log(`server is up and runing on http://localhost:${PORT} `)
})