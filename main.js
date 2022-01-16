const body = document.querySelector('.body');
const cardContainer = document.querySelector('.cardContainer');
const innerCardContainer = document.querySelector('.innerCardContainer');
const addButton = document.querySelector('.addButton');
const closeButton = document.querySelector('.togglePopup');
const cancelButton = document.querySelector('.cancelPopup')
const deleteAllButton = document.querySelector('.deleteAllButton');
const titleInput = document.querySelector('.titleInput');
const authorInput = document.querySelector('.authorInput');
const pagesInput = document.querySelector('.pagesInput');
const readInput = document.querySelector('.readInput');
let status2

class Book {
    constructor(title, author, pages, status2) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status2 = status2;
    }

    info = () => {
        return `${title} by ${author}, ${pages} pages, ${status2}`;
    }

    readToggle = (item) => {
        if (this.status2 == 'true') {
            this.status2 = 'false';
            status2 = 'false';
            item.textContent = 'Unread'
            item.classList.remove('bookRead')
        } else {
            this.status2 = 'true';
            status2 = 'true';
            item.textContent = 'Read'
            item.classList.add('bookRead')
        }
    }
}


let theHobbit1 = new Book('The Hobbit1', 'J.R.R. Tolkien', '295', 'true')
let Absalom = new Book('Absalom, Absalom!', 'William Faulkner', '295', 'false')
let Scanner = new Book('A Scanner Darkly', 'Philip K. Dick', '295', 'true')
let Brave = new Book('Brave New World', 'Aldous Huxley', '295', 'true')
let Fellowship = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', '423', 'true')
let Towers = new Book('The Two Towers', 'J.R.R. Tolkien', '352', 'true')
let ReturnOf = new Book('The Return of the King', 'J.R.R. Tolkien', '416', 'true')

let myLibrary = [theHobbit1, Absalom, Scanner, Brave, Fellowship, Towers, ReturnOf];

// Add To Library Button functionality
addButton.addEventListener('click', event => {
    var x = document.getElementById("popup");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
})

let exitPopup = () => {
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
}

closeButton.addEventListener('click', event => {
    if (titleInput.value == '' || authorInput.value == '' || pagesInput.value == '') {
        alert('Book not added due to missing information')
    } else {
        addBookToLibrary();
    }
    exitPopup();
})

cancelButton.addEventListener('click', event => {
    exitPopup();
})

// Delete All Button Functionality
deleteAllButton.addEventListener('click', event => {
    const userPrompt = prompt('Type "purgemewithhyssop" to remove all books from Library', 'no')
    if (userPrompt == 'purgemewithhyssop') {
        myLibrary = [];
        addCardsToPage();
    }
})

// Unread/Read button Event Listener
let addStatusListener = (item) => {
    item.addEventListener('click', event => {
        let i = findArrayPosition(item);
        myLibrary[i].readToggle(item);
    })
}

// Find array position from title
let findArrayPosition = (item) => {
    let arrayPosition = myLibrary.findIndex(p => p.title == `${item.title}`);
    return arrayPosition;
}

// Delete button Event Listener
let addDeleteListener = (item) => {
    item.addEventListener('click', event => {
        let arrayPosition = findArrayPosition(item);
        myLibrary.splice(arrayPosition, 1);
        addCardsToPage();
    })
}

function addToDoc(i, element, classs, appendTo = '', id = '', variable = '') {
    newElement = document.createElement(`${element}`);
    newElement.classList.add(`${classs}`);
    if (!appendTo == '') {
        appendTo.appendChild(newElement);
    }
    if (!id == '') {
        newElement.id = `${id}`;
    }

    return newElement;
}

// AddCardsToPage sub-functions
function newCardFunction(i) {
    thisBookTitle = `${myLibrary[i].title}`
    newCard = addToDoc(i, 'div', 'bookCard', '', thisBookTitle);
    innerCardID = `${myLibrary[i].title} Inner Card`;
    innerCard = addToDoc(i, 'div', 'innerCard', newCard, innerCardID,)
}

function deleteBookCardFunction(i) {
    let deleteButton = addToDoc(i, 'img', 'deleteButton');
    deleteButton.src = 'delete_black_24dp.svg';
    deleteButton.title = `${myLibrary[i].title}`;
    newCard.insertBefore(deleteButton, innerCard);
}

function bookTitleFunction(i) {
    let bookTitle = addToDoc(i, 'h2', 'bookTitle', innerCard)
    bookTitle.textContent = `${myLibrary[i].title}`;
}

function bookAuthorFunction(i) {
    let bookAuthor = addToDoc(i, 'h4', 'bookAuthor', innerCard)
    bookAuthor.textContent = `${myLibrary[i].author}`;
}

function secondBookDivFunction(i) {
    secondBookDiv = addToDoc(i, 'div', 'pagesAndStatus', newCard, 'Pages and status')
}

function bookLengthFunction(i) {
    bookLength = addToDoc(i, 'p', 'bookLength', secondBookDiv)
    bookLength.textContent = `${myLibrary[i].pages} pp`;
}

function bookStatusFunction(i) {
    bookStatus = addToDoc(i, 'button', 'bookStatus')
    if (myLibrary[i].status2 === 'true') {
        bookStatus.textContent = 'Read';
        bookStatus.classList.add('bookRead');
    } else {
        bookStatus.textContent = 'Unread';
    }
    bookStatus.title = `${myLibrary[i].title}`;
    secondBookDiv.appendChild(bookStatus);
}

let addCardsToPage = () => {
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        newCardFunction(i);
        deleteBookCardFunction(i);
        bookTitleFunction(i);
        bookAuthorFunction(i);
        secondBookDivFunction(i);
        bookLengthFunction(i);
        bookStatusFunction(i);
        cardContainer.appendChild(newCard);

    }
    document.querySelectorAll('.bookStatus').forEach(addStatusListener);
    document.querySelectorAll('.deleteButton').forEach(addDeleteListener);
}

// Add To Library function
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