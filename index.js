const express = require('express');

const app = express();

const PORT = 8081;

app.use(express.json())

app.get('/',(req,res) =>{
    res.status(200).json({
        massage: "Home Page :-)"
    })
})

// app.all('*',(req,res) => {
//     res.status(500).json({
//         massage: "Not Build yet"
//     })
// })

app.listen(PORT, ()=>{
    console.log(`server is up and runing on http://localhost:${PORT} `)
})