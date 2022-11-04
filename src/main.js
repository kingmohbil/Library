// these are the document elements that i need in the project
// to reduce searching in the DOM
const cardsContainer = document.querySelector('.card-container')
const bookForm = document.querySelector('.book-form')
const newBook = document.querySelector('#add-new-book')
// the array that contain the Book Objects
const Books = []
let index = -1
// the factory function that stores the data and returns an object
function bookObj(title, author, pages, status) {
  return {
    title,
    author,
    pages,
    status,
  }
}
// the Book class that conatin certain functionalities that the program needs
class Book {
  // craeting the necessery containers for displaying the data
  card = this.createDiv()
  title = this.createDiv()
  author = this.createDiv()
  pages = this.createDiv()
  readDiv = this.createDiv()
  delDiv = this.createDiv()
  readBtn = this.createBtn()
  delBtn = this.createBtn()
  // the constructor that sets the elements
  constructor(bookObj) {
    this.title.textContent = bookObj.title
    this.author.textContent = bookObj.author
    this.pages.textContent = bookObj.pages
    this.delBtn.textContent = 'Delete'
    if (bookObj.status) this.readBtn.textContent = 'Read'
    else this.readBtn.textContent = 'Not Read'
    this.card.setAttribute('data-index', ++index)
  }
  //  a function to create Div's
  createDiv() {
    return document.createElement('div')
  }
  // a function to create buttons
  createBtn() {
    return document.createElement('button')
  }
  // this function adds a class Name to a certain property
  addClass(e, className) {
    e.classList.add(className)
  }
  // this function appending the classes to the properties
  appendingClasses() {
    this.addClass(this.card, 'card')
    this.addClass(this.title, 'title-container')
    this.addClass(this.author, 'author-container')
    this.addClass(this.pages, 'pages-container')
    this.addClass(this.readDiv, 'status-btn-container')
    this.addClass(this.delDiv, 'delete-btn-container')
    this.addClass(this.readBtn, 'status-button')
    if (this.readBtn.textContent !== 'Read') this.addClass(this.readBtn, 'red')
    this.addClass(this.delBtn, 'delete-btn')
    this.addClass(this.delBtn, 'red')
  }
  // this function here creates the card but doesn't append it to the document yet
  createCard() {
    // this function adds the class List for the items
    this.appendingClasses()
    // these lines append the elements to make a card
    this.card.appendChild(this.title)
    this.card.appendChild(this.author)
    this.card.appendChild(this.pages)
    this.readDiv.appendChild(this.readBtn)
    this.delDiv.appendChild(this.delBtn)
    this.card.appendChild(this.readDiv)
    this.card.appendChild(this.delDiv)
    // this function changes the status of the Book Read property
    this.readBtn.addEventListener('click', function () {
      if (this.textContent === 'Read') this.textContent = 'Not Read'
      else this.textContent = 'Read'
      this.classList.toggle('red')
    })
    // this function give the delete button the instructions to do when clicked
    this.delBtn.onclick = function () {
      let index = this.parentElement.parentElement.getAttribute('data-index')
      this.parentElement.parentElement.remove()
      Books.splice(index, 1)
      --index
      UpdateIndexes()
    }
    // returns the card object
    return this.card
  }
  // this function appends the card to the document
  printCard() {
    cardsContainer.appendChild(this.createCard())
  }
  // this function sets the data-index arttribute to the card
  setIndex(index) {
    this.card.setAttribute('data-index', index)
  }
}

// this function print all the Books in the array
function printBooks() {
  Books.forEach(function (e) {
    e.printCard()
  })
}
// this function resets the form from the new book button
newBook.addEventListener('click', function () {
  bookForm.reset()
})
// this function have the instructions when submitting the form
bookForm.onsubmit = function (e) {
  const b = bookObj(
    bookForm.titleInput.value,
    bookForm.authorInput.value,
    bookForm.pagesInput.value,
    bookForm.statusInput.checked
  )
  Books.push(new Book(b))
  printBooks()
  bookForm.reset()
  e.preventDefault()
}
// the last function here updates the data-index attribute
function UpdateIndexes() {
  Books.forEach(function (e, i) {
    e.setIndex(i)
  })
}
