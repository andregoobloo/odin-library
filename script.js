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
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("h1");
  const bookAuthor = document.createElement("h3");
  const bookNumPages = document.createElement("h3");
  const bookReleaseYear = document.createElement("h3");
  const bookHasRead = document.createElement("h3");
  const deleteBookBtn = document.createElement("button");

  bookCard.dataset.index = book.index;
  bookCard.classList.add("book-card");
  bookTitle.classList.add("book-title");
  bookAuthor.classList.add("book-author");
  bookNumPages.classList.add("book-page-count");
  bookHasRead.classList.add("book-read-status");
  bookReleaseYear.classList.add("book-release-year");
  deleteBookBtn.classList.add("delete-book-btn");

  bookTitle.textContent = book.title;
  bookAuthor.textContent = `Author: ${book.author}`;
  bookReleaseYear.textContent = `Release Year: ${book.releaseYear}`;
  bookNumPages.textContent = `Page Count: ${book.numPages}`;
  bookReleaseYear.textContent = `Release Year: ${book.releaseYear}`;
  bookHasRead.textContent = book.hasRead === true ? "Read" : "Not read";
  deleteBookBtn.textContent = "Delete";

  library.appendChild(bookCard);
  bookCard.append(bookTitle);
  bookCard.append(bookAuthor);
  bookCard.append(bookReleaseYear);
  bookCard.append(bookNumPages);
  bookCard.append(bookHasRead);
  bookCard.append(deleteBookBtn);

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
