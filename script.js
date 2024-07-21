const dialog = document.querySelector("dialog");
const openDialogButton = document.querySelector("#open-dialog");
const addBookButton = document.querySelector("#add-book-button");
const closeDialogButton = document.querySelector("#close-dialog-button");
const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const display = document.querySelector("#display");

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
};

const myLibrary = [
  new Book("Pride and Prejudice", "	Jane Austen", 259),
  new Book("The Great Gatsby", "Scott Fitzgerald", 180),
  new Book("To Kill a Mockingbird", "Harper Lee", 281),

  

];

openDialogButton.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

addBookButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBook(title.value, author.value, pages.value);
  loadMyLibrary();
  form.reset();
  dialog.close();
});

function addBook(title, author, pages) {
  myLibrary.push(new Book(title, author, pages));
  sortMyLibrary();
};

function deleteBook(title, index) {
  confirm(`Are you sure you want to delete "${title}"?`)
  ? delete myLibrary[index]
  : false;
}

function sortMyLibrary() {
  myLibrary.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });
}

function loadMyLibrary() {
  display.textContent = "";
  myLibrary.forEach(book => {
    createCard(book);
  });
}

function createCard(book) {
  const card = document.createElement("div");
  const infos = document.createElement("div");
  const title = document.createElement("h2");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  // read needs to be added

  const deleteButton = document.createElement("img");

  deleteButton.addEventListener("click", () => {
    deleteBook(book.title, myLibrary.indexOf(book));
    loadMyLibrary();
  });

  deleteButton.setAttribute("class", "delete-button");
  deleteButton.setAttribute("src", "icons/delete.svg");
  deleteButton.setAttribute("alt", "delete button");

  title.textContent = book.title;
  author.textContent = "Author: " + book.author;
  pages.textContent = "Pages: " + book.pages;

  infos.appendChild(title);
  infos.appendChild(author);
  infos.appendChild(pages);

  card.setAttribute("class", "card");
  card.appendChild(infos);
  card.appendChild(deleteButton);

  display.appendChild(card);
}

loadMyLibrary();