const myLibrary = [
  new Book("The Hobbit", "J.R.R Tolkien", 301),
  new Book("Test Title", "Test Author", 2),
  new Book("Test Title", "Test Author", 2),
  new Book("Test Title", "Test Author", 2)

];

const dialog = document.querySelector("dialog");
const button = document.querySelector("#open-dialog");
const addBookButton = document.querySelector("#add-book-button");
const closeDialogButton = document.querySelector("#close-dialog-button");
const form = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");



button.addEventListener("click", () => {
  dialog.showModal();
});

addBookButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(title.value);
  form.reset();
  dialog.close();
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

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

onload(loadMyLibrary());