const myLibrary = [new Book("The Hobbit", "J.R.R Tolkien", 301)];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}


function addBookToLibrary() {
  
}

function loadMyLibrary() {
  myLibrary.forEach(book => {
    createCard(book);
  })
}

function createCard(book) {
  console.log(book.title)
}

loadMyLibrary();