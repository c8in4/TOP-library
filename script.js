const dialog = document.querySelector("dialog");
const openDialogButton = document.querySelector("#open-dialog");
const addBookButton = document.querySelector("#add-book-button");
const closeDialogButton = document.querySelector("#close-dialog-button");
const display = document.querySelector("#display");

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  changeStatus = () => {
    this.status = !this.status;
  }
};

const myLibrary = [
  new Book("Pride and Prejudice", "	Jane Austen", 259, true),
  new Book("The Great Gatsby", "Scott Fitzgerald", 180, false),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
];

openDialogButton.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

addBookButton.addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.querySelector("form");
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const status = document.querySelector("#status");

  addBook(title.value, author.value, pages.value, status.checked);
  loadMyLibrary();

  form.reset()
  dialog.close();
});

function addBook(title, author, pages, status) {
  author = !author ? "unknown" : author;
  pages = !pages ? "unknown" : pages;

  if (title) {
    myLibrary.push(new Book(title, author, pages, status));
    sortMyLibrary();
  }
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
  const status = document.createElement("p");
  const buttons = document.createElement("div");
  const statusButton = document.createElement("button");
  const deleteButton = document.createElement("img");

  statusButton.addEventListener("click", () => {
    book.changeStatus();
    loadMyLibrary();
  });

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

  let read = "not read yet";
  let buttonText = '"read"';
  if (book.status) {
    read = "already read";
    buttonText = '"not read"';
  };
  status.textContent = "Status: " + read;
  statusButton.textContent = "Mark as " + buttonText;

  buttons.setAttribute("class", "card-buttons");
  buttons.appendChild(statusButton);
  buttons.appendChild(deleteButton);

  infos.appendChild(title);
  infos.appendChild(author);
  infos.appendChild(pages);
  infos.appendChild(status);

  card.setAttribute("class", "card");
  card.appendChild(infos);
  card.appendChild(buttons);

  display.appendChild(card);
}

loadMyLibrary();
