"use strict";

const myLibrary = [];

function Book(title, author, numPages, releaseYear, hasRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.releaseYear = releaseYear;
  this.hasRead = hasRead;
  this.index = myLibrary.length;
}

function addBookToLibrary(title, author, numPages, releaseYear, hasRead) {
  const book = new Book(title, author, numPages, releaseYear, hasRead);
  myLibrary.push(book);
}

const libraryRead = document.querySelector(".library-read");
const libraryNotRead = document.querySelector(".library-not-read");
const libraryReadTitle = document.querySelector(".read-title");
const libraryNotReadTitle = document.querySelector(".unread-title");

const displayTitles = function () {
  libraryReadTitle.textContent = `${
    myLibrary.filter((book) => book.hasRead === true).length
  } Books Read`;
  libraryNotReadTitle.textContent = `${
    myLibrary.filter((book) => book.hasRead === false).length
  } Books Not Read`;
};

const displayBook = function (book) {
  // Book card
  const bookCard = document.createElement("div");
  bookCard.dataset.index = book.index;
  bookCard.classList.add("book-card");

  // Book title
  const bookTitle = document.createElement("h1");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = book.title;

  // Book author
  const bookAuthor = document.createElement("h3");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = `By ${book.author}`;

  // Book page count
  const bookNumPages = document.createElement("h3");
  bookNumPages.classList.add("book-page-count");
  bookNumPages.textContent = `${book.numPages} pages`;

  // Book release year
  const bookReleaseYear = document.createElement("h3");
  bookReleaseYear.classList.add("book-release-year");
  bookReleaseYear.textContent = `Published in ${book.releaseYear}`;

  // Book was read or not
  const bookHasRead = document.createElement("h3");
  bookHasRead.classList.add("book-read-status");

  // Delete book
  const deleteBookBtn = document.createElement("span");
  deleteBookBtn.classList.add("material-symbols-outlined", "delete-book-btn");
  deleteBookBtn.textContent = "delete";

  // Change read status
  const changeReadStatusBtn = document.createElement("button");
  changeReadStatusBtn.classList.add("change-read-status");
  changeReadStatusBtn.textContent =
    book.hasRead === true ? "Add to unread" : "Add to read";

  // Appending
  const appendBookCard = function () {
    bookCard.append(bookTitle);
    bookCard.append(bookAuthor);
    bookCard.append(bookReleaseYear);
    bookCard.append(bookNumPages);
    bookCard.append(bookHasRead);
    bookCard.append(deleteBookBtn);
    bookHasRead.append(changeReadStatusBtn);
  };
  if (book.hasRead === true) {
    libraryRead.appendChild(bookCard);
    appendBookCard();
  } else if (book.hasRead === false) {
    libraryNotRead.appendChild(bookCard);
    appendBookCard();
  }

  // Delete button
  deleteBookBtn.addEventListener("click", function (e) {
    e.preventDefault();
    deleteBook(book.index);
  });

  // Change read value button
  changeReadStatusBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (book.hasRead === true) {
      book.hasRead = false;
    } else {
      book.hasRead = true;
    }
    displayLibrary();
  });
};

const displayLibrary = function () {
  // Clears display
  while (libraryRead.firstChild) {
    libraryRead.removeChild(libraryRead.firstChild);
  }
  while (libraryNotRead.firstChild) {
    libraryNotRead.removeChild(libraryNotRead.firstChild);
  }
  // Adds books to display
  myLibrary.forEach((book) => displayBook(book));

  // Total book count per section
  displayTitles();
};

const deleteBook = function (index) {
  myLibrary.splice(index, 1);
  const bookSelected = document.querySelector(
    `.book-card[data-index="${index}"]`
  );
  if (libraryRead.contains(bookSelected)) {
    libraryRead.removeChild(bookSelected);
  } else if (libraryNotRead.contains(bookSelected)) {
    libraryNotRead.removeChild(bookSelected);
  }
  displayTitles();
};

addBookToLibrary("Kan", "Neena Geena", 323, 1908, false);
addBookToLibrary("Petper Peep", "Sawyaer Timbo", 500, 1998, true);
addBookToLibrary("Hunger Games", "Somebody", 350, 2010, true);
addBookToLibrary("Kan", "Neena Geena", 323, 1908, false);
addBookToLibrary("Petper Peep", "Sawyaer Timbo", 500, 1998, true);
addBookToLibrary("Hunger Games", "Somebody", 350, 2010, true);
addBookToLibrary("Kan", "Neena Geena", 323, 1908, false);
addBookToLibrary("Petper Peep", "Sawyaer Timbo", 500, 1998, true);
addBookToLibrary("Hunger Games", "Somebody", 350, 2010, true);
addBookToLibrary("Kan", "Neena Geena", 323, 1908, false);
addBookToLibrary("Petper Peep", "Sawyaer Timbo", 500, 1998, true);
addBookToLibrary("Hunger Games", "Somebody", 350, 2010, true);
addBookToLibrary("Kan", "Neena Geena", 323, 1908, false);
addBookToLibrary("Petper Peep", "Sawyaer Timbo", 500, 1998, true);
addBookToLibrary("Hunger Games", "Somebody", 350, 2010, true);

displayLibrary();

// Modal Dialog
const showButton = document.getElementById("new-book-dialog");
const newBookDialog = document.getElementById("new-book-form-dialog");
const closeDialog = document.querySelector(".close-dialog");

showButton.addEventListener("click", () => newBookDialog.showModal());

closeDialog.addEventListener("click", () => newBookDialog.close());

// Add new book to collection
const newBookForm = document.querySelector(".new-book-form");

newBookForm.onsubmit = (e) => {
  e.preventDefault();
  const newBookTitle = document.getElementById("title").value;
  const newBookAuthor = document.getElementById("author").value;
  const newBookReleaseYear = document.getElementById("release-year").value;
  const newBookPageCount = document.getElementById("page-count").value;
  const newBookReadStatus = document.getElementById("read").checked;

  addBookToLibrary(
    newBookTitle,
    newBookAuthor,
    newBookReleaseYear,
    newBookPageCount,
    newBookReadStatus
  );
  newBookDialog.close();
  displayLibrary();
};
