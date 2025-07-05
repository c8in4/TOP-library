const myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkin', 295, false),
  new Book("Pride and Prejudice", "	Jane Austen", 259, true),
  new Book("The Great Gatsby", "Scott Fitzgerald", 180, false),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false)
]

const display = document.querySelector("#display")
displayBooks()

function Book(title, author, pages, readStatus) {
  if (!new.target) throw Error("Use 'new' operator to call 'Book' constructor")
  this.bookId = crypto.randomUUID()
  this.title = title
  this.author = author
  this.pages = pages
  this.readStatus = readStatus
}

Book.prototype.toggleReadStatus = function () {
  this.readStatus = !this.readStatus
}

function addBookToLibrary(title, author, pages, readStatus) {
  const newBook = new Book(title, author, pages, readStatus)
  myLibrary.push(newBook)
}

function displayBooks() {
  display.innerText = ''
  myLibrary.forEach(book => {
    const bookCard = createCard(book)
    displayCard(bookCard)
  })
}

function createCard(book) {
  const cardContainer = document.createElement('div')
  cardContainer.classList.add('card')

  const title = document.createElement('h2')
  title.innerText = book.title

  const infoContainer = document.createElement('div')
  infoContainer.classList.add('infoContainer')
  const author = document.createElement('p')
  author.innerText = book.author
  author.style.fontWeight = 'bold'
  infoContainer.appendChild(author)
  const pages = document.createElement('p')
  if (book.pages) {
    pages.innerText = 'has ' + book.pages + ' pages'
    infoContainer.appendChild(pages)
  }
  const readStatus = document.createElement('p')
  readStatus.innerText = book.readStatus ? 'already read' : 'not read yet'
  infoContainer.appendChild(readStatus)

  const cardButtonContainer = document.createElement('div')
  cardButtonContainer.classList.add('cardButtonContainer')
  const toggleReadStatusButton = document.createElement('button')
  toggleReadStatusButton.innerText = book.readStatus ? 'unread' : 'read'
  toggleReadStatusButton.addEventListener('click', () => {
    book.toggleReadStatus()
    displayBooks()
  })

  const deleteButton = document.createElement('img')
  deleteButton.src = 'icons/delete-white.svg'
  deleteButton.dataset.bookId = book.bookId
  cardButtonContainer.append(toggleReadStatusButton, deleteButton)

  cardContainer.append(title, infoContainer, cardButtonContainer)
  return cardContainer
}

function displayCard(card) {
  display.appendChild(card)
}

display.addEventListener('click', (event) => {
  if (event.target.dataset.bookId) {
    const id = event.target.dataset.bookId
    deleteBook(id)
  }
})

function deleteBook(id) {
  const indexOfBookToDelete = myLibrary.findIndex(book => {
    return book.bookId == id
  })
  if (!confirm(`Are you sure you want to delete '${myLibrary[indexOfBookToDelete].title}'`)) return
  myLibrary.splice(indexOfBookToDelete, 1)
  displayBooks()
}

// dialog stuff
const dialog = document.querySelector("dialog")
const form = document.querySelector("form")

const openDialogButton = document.querySelector("#open-dialog-button")
openDialogButton.addEventListener("click", () => {
  dialog.showModal()
})

const closeDialogButton = document.querySelector("#close-dialog-button")
closeDialogButton.addEventListener("click", () => {
  dialog.close()
})

dialog.addEventListener("close", () => {
  if (dialog.returnValue == 'add-book') {
    addBookFromFormToLibrary()
    displayBooks()
  }
  form.reset()
})

function addBookFromFormToLibrary() {
  const title = document.querySelector("#title")
  const author = document.querySelector("#author")
  const pages = document.querySelector("#pages")
  const status = document.querySelector("#status")

  console.log(status.checked)

  addBookToLibrary(title.value, author.value, pages.value, status.checked)
}

// function sortMyLibrary() {
//   myLibrary.sort((a, b) => {
//     const titleA = a.title.toUpperCase()
//     const titleB = b.title.toUpperCase()
//     if (titleA < titleB) {
//       return -1
//     }
//     if (titleA > titleB) {
//       return 1
//     }
//     return 0
//   })
// }