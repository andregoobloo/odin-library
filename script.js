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
  const bookTitleDiv = document.createElement("div");
  bookTitleDiv.classList.add("book-title-div");
  const bookTitle = document.createElement("h1");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = book.title;

  // Book info div
  const bookInfoDiv = document.createElement("div");
  bookInfoDiv.classList.add("book-info-div");

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

  // Buttons div
  const bookBtnDiv = document.createElement("div");
  bookBtnDiv.classList.add("book-btn-div");

  // Delete book
  const deleteBookBtn = document.createElement("span");
  deleteBookBtn.classList.add("material-symbols-outlined", "delete-book-btn");
  deleteBookBtn.textContent = "delete";

  // Change read status
  const changeReadStatusBtn = document.createElement("button");
  changeReadStatusBtn.classList.add("change-read-status");
  changeReadStatusBtn.textContent =
    book.hasRead === true ? "Add to Unread" : "Add to Read";

  // Appending
  const appendBookCard = function () {
    bookCard.appendChild(bookTitleDiv);
    bookCard.append(bookInfoDiv);
    bookCard.append(bookBtnDiv);
    bookTitleDiv.append(bookTitle);
    bookInfoDiv.append(bookAuthor);
    bookInfoDiv.append(bookReleaseYear);
    bookInfoDiv.append(bookNumPages);
    // bookCard.append(bookHasRead);
    bookBtnDiv.append(changeReadStatusBtn);
    bookBtnDiv.append(deleteBookBtn);
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

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 323, 1960, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, 1813, false);
addBookToLibrary("Animal Farm", "George Orwell", 141, 1945, true);
addBookToLibrary(
  "The Little Prince",
  "Antoine de Saint-Exupery",
  96,
  1943,
  false
);
addBookToLibrary("1984", "George Orwell", 368, 1949, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, 1925, true);
addBookToLibrary("Lord of the Flies", "William Golding", 182, 1954, false);
addBookToLibrary("The Kite Runner", "Khaled Hosseini", 371, 2003, true);
addBookToLibrary("Charlotte's Web", "E.B. White", 184, 1952, false);

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

// Sorting books
const sortBtns = document.querySelector(".sort-btns");

sortBtns.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.textContent === "Pages") {
    myLibrary.sort((a, b) => a.numPages - b.numPages);
  }
  if (e.target.textContent === "Year") {
    myLibrary.sort((a, b) => a.releaseYear - b.releaseYear);
  }
  if (e.target.textContent === "Title") {
    myLibrary.sort((first, second) => {
      const firstTitle = first.title.toUpperCase();
      const secondTitle = second.title.toUpperCase();
      if (firstTitle < secondTitle) {
        return -1;
      } else if (firstTitle > secondTitle) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  if (e.target.textContent === "Author") {
    myLibrary.sort((first, second) => {
      const firstAuthor = first.author.toUpperCase();
      const secondAuthor = second.author.toUpperCase();
      if (firstAuthor < secondAuthor) {
        return -1;
      } else if (firstAuthor > secondAuthor) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  displayLibrary();
});
