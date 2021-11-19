const body = document.querySelector('.body');
const cardContainer = document.querySelector('.cardContainer');
const addButton = document.querySelector('.addButton')
const closeButton = document.querySelector('.togglePopup')

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Unread')
let theHobbit2 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Unread')
let theHobbit3 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Unread')
let theHobbit4 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Unread')
let theHobbit5 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Unread')
let theHobbit6 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Unread')
let theHobbit7 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'Unread')

addButton.addEventListener('click', event => {
    var x = document.getElementById("popup");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
})

closeButton.addEventListener('click', event => {
    var x = document.getElementById("popup");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
})


let myLibrary = [theHobbit, theHobbit2, theHobbit3, theHobbit4, theHobbit5, theHobbit6, theHobbit7];

let addCardsToPage = () => {
    for (let i = 0; i < myLibrary.length; i++) {
        newCard = document.createElement('div');
        newCard.id = `${myLibrary[i].title} Card`
        newCard.classList.add('bookCard');

        bookTitle = document.createElement('h2');
        bookTitle.textContent = `${myLibrary[i].title}`;
        bookTitle.classList.add('bookTitle')
        newCard.appendChild(bookTitle);

        bookAuthor = document.createElement('h4');
        bookAuthor.textContent = `${myLibrary[i].author}`;
        bookAuthor.classList.add('bookAuthor');
        newCard.appendChild(bookAuthor);

        secondBookDiv = document.createElement('div');
        secondBookDiv.id = `Pages and status`;
        secondBookDiv.classList.add('pagesAndStatus');
        newCard.appendChild(secondBookDiv);

        bookLength = document.createElement('p');
        bookLength.textContent = `${myLibrary[i].pages} pp`;
        bookLength.classList.add('bookLength');
        secondBookDiv.appendChild(bookLength);

        bookStatus = document.createElement('p');
        bookStatus.textContent = `${myLibrary[i].read}`;
        bookStatus.classList.add('bookStatus');
        secondBookDiv.appendChild(bookStatus);

        cardContainer.appendChild(newCard);

    }
}

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




addCardsToPage();

console.log(theHobbit.info());