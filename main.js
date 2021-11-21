const body = document.querySelector('.body');
const cardContainer = document.querySelector('.cardContainer');
const addButton = document.querySelector('.addButton');
const closeButton = document.querySelector('.togglePopup');
const cancelButton = document.querySelector('.cancelPopup')
const deleteAllButton = document.querySelector('.deleteAllButton');
const titleInput = document.querySelector('.titleInput');
const authorInput = document.querySelector('.authorInput');
const pagesInput = document.querySelector('.pagesInput');
const readInput = document.querySelector('.readInput');


let theHobbit1 = new Book('The Hobbit1', 'J.R.R. Tolkien', '295', 'true')
let theHobbit2 = new Book('The Hobbit2', 'J.R.R. Tolkien', '295', 'true')
let theHobbit3 = new Book('The Hobbit3', 'J.R.R. Tolkien', '295', 'false')
let theHobbit4 = new Book('The Hobbit4', 'J.R.R. Tolkien', '295', 'true')
let theHobbit5 = new Book('The Hobbit5', 'J.R.R. Tolkien', '295', 'false')
let theHobbit6 = new Book('The Hobbit6', 'J.R.R. Tolkien', '295', 'false')
let theHobbit7 = new Book('The Hobbit7', 'J.R.R. Tolkien', '295', 'true')

let myLibrary = [theHobbit1, theHobbit2, theHobbit3, theHobbit4, theHobbit5, theHobbit6, theHobbit7];

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

// AddCardsToPage sub-functions
function newCardFunction(i) {
    newCard = document.createElement('div');
    newCard.id = `${myLibrary[i].title} Card`
    newCard.classList.add('bookCard');
}

function deleteBookCardFunction(i) {
    deleteButton = document.createElement('img');
    deleteButton.src = 'delete_black_24dp.svg';
    deleteButton.classList.add('deleteButton')
    deleteButton.title = `${myLibrary[i].title}`;
    newCard.appendChild(deleteButton);
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
    bookStatus = document.createElement('button');
    if (myLibrary[i].status === 'true') {
        bookStatus.textContent = 'Read';
        bookStatus.classList.add('bookRead');
    } else {
        bookStatus.textContent = 'Unread';
    }
    bookStatus.classList.add('bookStatus');
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

// Book constructor declaration
function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${status}`;
    }
    this.readToggle = function (item) {
        if (this.status == 'true') {
            this.status = 'false';
            status = 'false';
            item.textContent = 'Unread'
            item.classList.remove('bookRead')
        } else {
            this.status = 'true';
            status = 'true';
            item.textContent = 'Read'
            item.classList.add('bookRead')
        }
    }
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