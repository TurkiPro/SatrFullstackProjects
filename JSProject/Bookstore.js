let library = [];

const temp = document.querySelector('.book');
const bookshelf = document.querySelector('#bookshelf');
let idBook = library.length;

function Book(title, author, bookID, bookPrice, bookQuantity) {
    this.bookPrice = bookPrice;
    this.bookQuantity = bookQuantity;
    this.bookID = bookID;
    this.title = title;
    this.author = author;

}

function ReloadLibrary() {
    library = JSON.parse(localStorage.library);

    bookshelf.innerHTML = '';
    bookshelf.appendChild(temp);

    for (let i = 0; i < library.length; i += 1) {
        // eslint-disable-next-line no-use-before-define
        DisplayBook(library[i]);
    }
}

function SaveBook(bookTitle, bookAuthor, bookID, bookPrice, bookQuantity) {
    const book = new Book(bookTitle, bookAuthor, bookID, bookPrice, bookQuantity);
    if (!Array.isArray(library)) {
        library = [];
    }
    library.push(book);

    localStorage.library = JSON.stringify(library);

    ReloadLibrary();
}

function AddBook() {

    const formAddBook = document.forms.AddBook;
    const bookData = new FormData(formAddBook);

    const bookTitle = bookData.get('title');
    const bookAuthor = bookData.get('author');
    const bookID = bookData.get('id');
    const bookPrice = bookData.get('price');
    const bookQuantity = bookData.get('quantity');

    SaveBook(bookTitle, bookAuthor, bookID, bookPrice, bookQuantity);

}

function DisplayBook(book) {
    const clon = temp.content.cloneNode(true);
    clon.querySelectorAll('p')[0].innerHTML = 'BOOK NAME: ' + book.title;
    clon.querySelectorAll('p')[1].innerHTML = 'AUTHOR NAME: ' + book.author;
    clon.querySelectorAll('p')[2].innerHTML = 'BOOK ID: ' + book.bookID;
    clon.querySelectorAll('p')[3].innerHTML = 'BOOK PRICE: ' + book.bookPrice;
    clon.querySelectorAll('p')[4].innerHTML = 'QUANTITY: ' + book.bookQuantity;




    clon.querySelector('button').addEventListener('click', () => { DeleteBook(book.id); });

    bookshelf.appendChild(clon);
}

function DeleteBook(id) {
    library = library.filter((book) => book.id !== id);

    localStorage.library = JSON.stringify(library);

    ReloadLibrary();
}

// Load the Library on opening the page
ReloadLibrary();
