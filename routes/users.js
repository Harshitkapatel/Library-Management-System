const express = require('express')
const users = require('../data/users.json')

const router = express.Router()

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Accesss: Public
 * Parameter: None
 */
router.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})


/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by their ID
 * Accesss: Public
 * Parameter: Id
 */
router.get('/:id', (req,res) => {

    //we are getting the ID from the perams
    //parseInt is used to convert the string id to a number because the id in the users.json is a number
    // const id = parseInt(req.params.id);
    const {id} = req.params

    //user find the all id and match the id with the parameter id
    const user = users.find((each) => each.id === id);

    if(!user){
      return  res.status(404).json({
            success:false,
            message: `User not found by their givin ID : ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: user
    })
})


/**
 * Route: /users
 * Method: POST
 * Description: Create/Register a new user
 * Accesss: Public
 * Parameter: None
 */
router.post('/', (req,res) => {
    //we are getting the data from the body of the request
    const{id,name,email,phone,subscriptionDate,subscriptionStatus,subscriptionType} = req.body

    //we are checking if any of the required fields are missing
    if(!id || !name || !email || !phone || !subscriptionDate || !subscriptionStatus || !subscriptionType){
       return res.status(401).json({
            success: false,
            message: "Please provide all the required fields"
        })
    }

    //we are checking if the user already exists with the same id
    const user = users.find((user) => user.id === id )
    if(user){
        return res.status(406).json({
            success: false,
            message: `User Already Exited with id:${id}`
        })
    }

    //if everything is fine then we will push the new user to the users array
    users.push({id, name, email, phone, subscriptionStatus, subscriptionType})

    //after pushing the new user to the users array we will send a response to the client    
    res.status(201).json({
        success: true,
        message: "User Created Successfully"
    })
})


/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user by their ID
 * Accesss: Public
 * Parameter: ID
 */
router.put('/:id', (req, res) =>{
    //we are getting the ID from the perams 
    const {id} = req.params;

    //we are getting the data from the body of the request
    const {data} = req.body;

    //we are checking if the user exists with the same id
    const user = users.find((each) => each.id === id )
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found of ID:${id}`
        })
    }

    //if the user exists then we will update the user with the new data
    //we using spread operator
    const updatedUser = users.map((each) => {
        if(each.id === id){
            return{
                ...each,
                ...data,
            }
        }
        return each 
    })

    //after updating the user we will send a response to the client
    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User Updated Successfully"
    })
})


/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their ID
 * Accesss: Public
 * Parameter: ID
 */

router.delete('/:id', (req, res) =>{
    //we are getting the ID from the perams
    const {id} = req.params;

    //we are checking if the user exists with the same id
    const user = users.find((each) => each.id === id)
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found of id: ${id}`
        })
    }

    //if the user exists then we will delete the user from the users array
    const updatedUser = users.filter((each) => each.id !== id)

    //2nd method
    // const index = users.indexOf(user)
    // users.splice(index, 1)

    //after deleting the user we will send a response to the client
    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User Deleted Successfully"
    })

})


/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Getting the subscription details of a user by their ID
 * Accesss: Public
 * Parameter: ID
 */

router.get('/subscription-details/:id',(req, res) => {
    const {id} = req.params;
    
    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(404).json({
            success:false,
            message: `User not found for id: ${id}`
        })
    }

    ///extract the subscription details
    const getDateInDate = (data = "") => {
        let date;
        if(data){
            date = new Date(data);
        }else{
            date = new Date()
        }
        let days = Math.floor( date/ (1000 * 60 * 60 * 24))
        return days;
    }

    const subscriptionTypes = (date) => {
        if(user.subscriptionType === "basic"){
            date = date + 90            
        }else if(user.subscriptionType === "standard"){
            date = date + 180
        }else if(user.subscriptionType === "premium"){
            date = date + 365
        }
        return date;
    }

    //Subscription Expiration Calculation
    let returnDate = getDateInDate(user.returnDate);
    let curruntDate = getDateInDate();;
    let subscriptionDate = getDateInDate(user.subscriptionDate);
    let subscriptionExpiration = subscriptionTypes(subscriptionDate);

    const data = {
        ...user,
        //if the subscription expiration date is less than the current date then the subscription is expired
        subscriptionExpired: subscriptionExpiration < curruntDate,

        //subscription days left 
        //it calculated by subtracting the current date from the subscription expiration date
        subscriptionDaysLeft: subscriptionExpiration - curruntDate,

        //book return days left
        //it calculated by subtracting the current date from the return date
        daysLeftForExpiration: returnDate - curruntDate,

        //if the return date is less than the current date then the book is overdue otherwise it will return the return date
        returnDate: returnDate < curruntDate ? "Book is overdue" : returnDate,

        //fine calculation
        //1 check if the return date is less than the current date then the book is overdue 
        //2 check if the subscription is expired 
        //if both are true then it pay 200
        //if one of than is true then it pay 100
        //if both are false then it pay 0
        fine: returnDate < curruntDate ? subscriptionExpiration <= curruntDate ? 200 : 100 : 0
    }
    res.status(200).json({
        success: true,
        data: data
    });
})

module.exports = router;