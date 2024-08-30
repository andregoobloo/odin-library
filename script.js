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

const library = document.querySelector(".library");

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
  bookAuthor.textContent = `Author: ${book.author}`;

  // Book page count
  const bookNumPages = document.createElement("h3");
  bookNumPages.classList.add("book-page-count");
  bookNumPages.textContent = `Page Count: ${book.numPages}`;

  // Book release year
  const bookReleaseYear = document.createElement("h3");
  bookReleaseYear.classList.add("book-release-year");
  bookReleaseYear.textContent = `Release Year: ${book.releaseYear}`;

  // Book was read or not
  const bookHasRead = document.createElement("h3");
  bookHasRead.classList.add("book-read-status");
  bookHasRead.textContent = book.hasRead === true ? "Read" : "Not read";

  // Delete book
  const deleteBookBtn = document.createElement("span");
  deleteBookBtn.classList.add("material-symbols-outlined", "delete-book-btn");
  deleteBookBtn.textContent = "delete";

  // Appending
  library.appendChild(bookCard);
  bookCard.append(bookTitle);
  bookCard.append(bookAuthor);
  bookCard.append(bookReleaseYear);
  bookCard.append(bookNumPages);
  bookCard.append(bookHasRead);
  bookCard.append(deleteBookBtn);

  // Delete button
  deleteBookBtn.addEventListener("click", function (e) {
    e.preventDefault();
    deleteBook(book.index);
  });
};

const displayLibrary = function () {
  // Clears display
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
  // Adds books to display
  myLibrary.forEach((book) => displayBook(book));
};

const deleteBook = function (index) {
  myLibrary.splice(index, 1);
  const bookSelected = document.querySelector(
    `.book-card[data-index="${index}"]`
  );
  library.removeChild(bookSelected);
};

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
