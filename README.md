# Library-Management-System

  This is a library managment APT backand for the managment of users and the books

# Roots and Endpoints

## /users
GET: Get all the list of users in the system
POST: Create/Register a new user

## /users/{id}
GET: Get a user by their ID
PUt: Updating a user by their ID
DELETE: Deleting a user by their ID (check if the user still has an issued book) && (is there any fine/panalty to be collected)

## /users/subscription-details/{id}
GET: Get a user subscription details by their ID
    >> Date of subscription
    >> Valid till ?
    >> fine if any ?


## /books
GET: Get all the books in the system
POST: Add a new book to the system

## /books/{id}
GET: Get a book by its ID
PUT: Update a book by its ID
DELETE: Delete a book by its ID


## /books/issued
GET: Get all the issued books

## /books/issued/withfine
GET: Get all the ssued books with their  fine amount


### subscription Types
    >> Basic(3 months)
    >> Standard(6 months)
    >> Premium(12 mouths)

>> If a user missed the renewal date, then user should be collected with $100
>> If a user misses the subscription, than user is expected to pay $100
>> If a user missed the both renewal data/subscription, then user  collected amount should be $200


## Commands
npm init
npm i express
npm i nodemon --save-dev (it is a dev dependencies)

To run the server --> npm run dev / npm run start

TO restore node_modules and package-lock.json --> npm i/npm install


## Git Commands

git status
git add .
git status
git commit -m "initial set up" (commit in main branch)
git push

git chackout -b "initail set up" (create a new branch)