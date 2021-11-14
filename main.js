let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
}

function addBookToLibrary() {

}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet')

console.log(theHobbit.info());