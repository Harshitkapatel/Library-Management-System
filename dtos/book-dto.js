//Data Transfer Object


class IssuedBooks{
    _id;
    name;
    author;
    year;
    genre;
    publisher;
    price;
    issuedBy;
    issuedDate;
    returnDate;

    constructor(user){
        this._id = user.IssuedBooks._id;
        this.name = user.IssuedBooks.name;
        this.author = user.IssuedBooks.author;
        this.year = user.IssuedBooks.year;
        this.genre = user.IssuedBooks.genre;
        this.publisher = user.IssuedBooks.publisher;
        this.price = user.IssuedBooks.price;
        this.issuedBy = user.issuedBy;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    }
}

