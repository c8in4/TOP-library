class Book {
  bookId = crypto.randomUUID();
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  toggleReadStatus() {
    this.readStatus = !this.readStatus;
  }
}

const myLibrary = [
  new Book("The Hobbit", "J.R.R. Tolkin", 295, false),
  new Book("Pride and Prejudice", "Jane Austen", 259, true),
  new Book("The Great Gatsby", "Scott Fitzgerald", 180, false),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
];

const display = document.querySelector("#display");
const filterSelect = document.querySelector("#sortBooksBy");

displayBooks();

function addBookToLibrary(title, author, pages, readStatus) {
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

function displayBooks(library = myLibrary) {
  display.innerText = "";
  sortMyLibrary();
  library.forEach((book) => {
    const bookCard = createCard(book);
    displayCard(bookCard);
  });
}

function createCard(book) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");

  const title = document.createElement("h2");
  title.innerText = book.title;

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("infoContainer");
  const author = document.createElement("p");
  author.innerText = book.author;
  author.style.fontWeight = "bold";
  infoContainer.appendChild(author);
  const pages = document.createElement("p");
  if (book.pages) {
    pages.innerText = "has " + book.pages + " pages";
    infoContainer.appendChild(pages);
  }
  const readStatus = document.createElement("p");
  readStatus.innerText = book.readStatus ? "already read" : "not read yet";
  infoContainer.appendChild(readStatus);

  const cardButtonContainer = document.createElement("div");
  cardButtonContainer.classList.add("cardButtonContainer");
  const toggleReadStatusButton = document.createElement("button");
  toggleReadStatusButton.innerText = book.readStatus ? "unread" : "read";
  toggleReadStatusButton.addEventListener("click", () => {
    book.toggleReadStatus();
    displayBooks();
  });

  const deleteButton = document.createElement("img");
  deleteButton.src = "icons/delete.svg";
  deleteButton.dataset.bookId = book.bookId;
  cardButtonContainer.append(toggleReadStatusButton, deleteButton);

  cardContainer.append(title, infoContainer, cardButtonContainer);
  return cardContainer;
}

function displayCard(card) {
  display.appendChild(card);
}

display.addEventListener("click", (event) => {
  if (event.target.dataset.bookId) {
    const id = event.target.dataset.bookId;
    deleteBook(id);
  }
});

function deleteBook(id) {
  const indexOfBookToDelete = myLibrary.findIndex((book) => {
    return book.bookId == id;
  });
  if (
    !confirm(
      `Are you sure you want to delete '${myLibrary[indexOfBookToDelete].title}'`
    )
  )
    return;
  myLibrary.splice(indexOfBookToDelete, 1);
  displayBooks();
}

// dialog stuff
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

const openDialogButton = document.querySelector("#open-dialog-button");
openDialogButton.addEventListener("click", () => {
  dialog.showModal();
});

const closeDialogButton = document.querySelector("#close-dialog-button");
closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("submit", (e) => {
  // e.preventDefault();
  // if (dialog.returnValue == "add-book") {
  addBookFromFormToLibrary();
  displayBooks();
  // }
  form.reset();
  // dialog.close();
});

function addBookFromFormToLibrary() {
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const status = document.querySelector("#status");
  if (
    title.checkValidity() &&
    author.checkValidity() &&
    pages.checkValidity()
  ) {
    addBookToLibrary(title.value, author.value, pages.value, status.checked);
  }
}

filterSelect.addEventListener("change", (event) => {
  const propertyToSortBy = event.target.value;
  const sortedLibrary = sortMyLibrary(propertyToSortBy);
  displayBooks(sortedLibrary);
  return;
});

function sortMyLibrary(propertyToSortBy = filterSelect.value) {
  myLibrary.sort((a, b) => {
    let propertyOfA = a[propertyToSortBy];
    let propertyOfB = b[propertyToSortBy];
    if (typeof propertyOfA == "string" && typeof propertyOfB == "string") {
      propertyOfA = propertyOfA.toUpperCase();
      propertyOfB = propertyOfB.toUpperCase();
    }

    if (propertyOfA > propertyOfB) {
      return 1;
    } else return -1;
  });
}

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");

title.addEventListener("input", validateTitle);
author.addEventListener("input", validateAuthor);
pages.addEventListener("input", validatePages);

function validateTitle() {
  const titleErrorSpan = document.querySelector("#title + span");
  if (!title.value) {
    title.setCustomValidity("Enter a book title.");
  } else if (title.value) {
    title.setCustomValidity("");
  }
  titleErrorSpan.textContent = title.validationMessage;
}

function validateAuthor() {
  const authorErrorSpan = document.querySelector("#author + span");
  if (!author.value) {
    author.setCustomValidity("Enter an authors name.");
  } else if (title.value) {
    author.setCustomValidity("");
  }
  authorErrorSpan.textContent = author.validationMessage;
}

function validatePages() {
  const pagesErrorSpan = document.querySelector("#pages + span");

  if (pages.value > 0 || !pages.value) {
    pages.setCustomValidity("");
  } else {
    pages.setCustomValidity("Enter a number greater than 0");
  }

  pagesErrorSpan.textContent = pages.validationMessage;
}
