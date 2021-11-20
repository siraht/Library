const body = document.querySelector('.body');
const cardContainer = document.querySelector('.cardContainer');
const addButton = document.querySelector('.addButton');
const closeButton = document.querySelector('.togglePopup');
const titleInput = document.querySelector('.titleInput');
const authorInput = document.querySelector('.authorInput');
const pagesInput = document.querySelector('.pagesInput');
const readInput = document.querySelector('.readInput');


let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'true')
let theHobbit2 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'true')
let theHobbit3 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'false')
let theHobbit4 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'true')
let theHobbit5 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'false')
let theHobbit6 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'false')
let theHobbit7 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'true')

addButton.addEventListener('click', event => {
    var x = document.getElementById("popup");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
})

closeButton.addEventListener('click', event => {
    addBookToLibrary();
    var x = document.getElementById("popup");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
    readInput.value = ''
})


let myLibrary = [theHobbit, theHobbit2, theHobbit3, theHobbit4, theHobbit5, theHobbit6, theHobbit7];

let addStatusListener = (item) => {
    item.addEventListener('click', event => {
        if (item.read === 'true') {
            item.read = 'false';
            item.textContent = 'Unread'
            item.classList.remove('bookRead')
        } else {
            item.read = 'true';
            item.textContent = 'Read'
            item.classList.add('bookRead')
        }

    })
}

function newCardFunction(i) {
    newCard = document.createElement('div');
    newCard.id = `${myLibrary[i].title} Card`
    newCard.classList.add('bookCard');
}

function bookTitleFunction(i) {
    bookTitle = document.createElement('h2');
    bookTitle.textContent = `${myLibrary[i].title}`;
    bookTitle.classList.add('bookTitle')
    newCard.appendChild(bookTitle);
}

function bookAuthorFunction(i) {
    bookAuthor = document.createElement('h4');
    bookAuthor.textContent = `${myLibrary[i].author}`;
    bookAuthor.classList.add('bookAuthor');
    newCard.appendChild(bookAuthor);
}

function secondBookDivFunction(i) {
    secondBookDiv = document.createElement('div');
    secondBookDiv.id = `Pages and status`;
    secondBookDiv.classList.add('pagesAndStatus');
    newCard.appendChild(secondBookDiv);
}

function bookLengthFunction(i) {
    bookLength = document.createElement('p');
    bookLength.textContent = `${myLibrary[i].pages} pp`;
    bookLength.classList.add('bookLength');
    secondBookDiv.appendChild(bookLength);
}

function bookStatusFunction(i) {
    bookStatus = document.createElement('p');
    if (myLibrary[i].read === 'true') {
        bookStatus.textContent = 'Read';
        bookStatus.classList.add('bookRead');
    } else {
        bookStatus.textContent = 'Unread';
    }
    bookStatus.classList.add('bookStatus');
    secondBookDiv.appendChild(bookStatus);
}

let addCardsToPage = () => {
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        newCardFunction(i);
        bookTitleFunction(i);
        bookAuthorFunction(i);
        secondBookDivFunction(i);
        bookLengthFunction(i);
        bookStatusFunction(i);
        cardContainer.appendChild(newCard);

    }
    document.querySelectorAll('.bookStatus').forEach(addStatusListener)
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
    let newBook = new Book(
        `${titleInput.value}`,
        `${authorInput.value}`,
        `${pagesInput.value}`,
        `${readInput.checked}`,
    )
    myLibrary.push(newBook);
    addCardsToPage();
}

addCardsToPage();

console.log(theHobbit.info());