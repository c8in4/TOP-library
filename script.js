const dialog = document.querySelector("dialog");
const openDialogButton = document.querySelector("#open-dialog");
const addBookButton = document.querySelector("#add-book-button");
const closeDialogButton = document.querySelector("#close-dialog-button");
const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
};

const myLibrary = [
  new Book("The Hobbit", "J.R.R Tolkien", 301),
];


openDialogButton.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

addBookButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(title.value, author.value, pages.value);
  loadMyLibrary();
  form.reset();
  dialog.close();
});


function addBookToLibrary(title, author, pages) {
  myLibrary.push(new Book(title, author, pages));
  sortMyLibrary();
};

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
  })
}

function createCard(book) {
  const display = document.querySelector("#display");
  const card = document.createElement("div");
  const title = document.createElement("h2");
  const author = document.createElement("p");
  const pages = document.createElement("p");

  title.textContent = book.title;
  author.textContent = "Author: " + book.author;
  pages.textContent = "Pages: " + book.pages;

  card.setAttribute("class", "card");
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);

  display.appendChild(card);
}

loadMyLibrary();