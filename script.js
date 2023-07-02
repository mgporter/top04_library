const addBookButton = document.getElementById('add-book-container');
const addBookDialogBox = document.getElementById('add-book-dialog-box');
const addBookForm = document.getElementById('add-book-form');
const submitBtn = document.getElementById('formsubmit');
const contentContainer = document.getElementById('content-container');
const bprNumberBox = document.getElementById('books-per-row-spinbox');
const spinboxIncrease = document.getElementById('spinbox-increase');
const spinboxDecrease = document.getElementById('spinbox-decrease');
const autoPopulateBtn = document.getElementById('autopopulate');

let deleteBookBtns;
let statusButtons;
let statusDropdownMenus;

let myLibrary = [];
let numberOfBooksPerRow = 3;
let booksPerRowMax = 5;
const bookContainerWidth = 360;

// Find the maximum number of books that can fit on a row
// considering the window's innerWidth. Max is 5.
function setBooksPerRowMax() {
  booksPerRowMax = Math.floor(window.innerWidth / bookContainerWidth);
  if (booksPerRowMax > 5) booksPerRowMax = 5;

  if (numberOfBooksPerRow > booksPerRowMax) {
    numberOfBooksPerRow = booksPerRowMax;
    bprNumberBox.textContent = numberOfBooksPerRow;
    displayLibrary();
  }

  return numberOfBooksPerRow;
}

// Set the initial value of the spinbox on startup
bprNumberBox.textContent = setBooksPerRowMax();

window.addEventListener('resize', setBooksPerRowMax);

spinboxIncrease.addEventListener('click', () => {
  if (+bprNumberBox.textContent >= booksPerRowMax) return;
  bprNumberBox.textContent = numberOfBooksPerRow =
    +bprNumberBox.textContent + 1;
  displayLibrary();
});

spinboxDecrease.addEventListener('click', () => {
  if (+bprNumberBox.textContent === 1) return;
  bprNumberBox.textContent = numberOfBooksPerRow =
    +bprNumberBox.textContent - 1;
  displayLibrary();
});

const changeReadStatus = function (e) {
  // get the value of readstatus from the child element (the one selected by the user)
  const readStatus = this.lastChild.dataset.readstatus;

  const bookNum = this.dataset.book;
  const readIndicator = document.querySelector(
    `.book-content.status-color[data-book="${bookNum}"]`
  );

  // set the read status indicator to the selected response
  readIndicator.dataset.readstatus = readStatus;

  toggleVisibility(
    document.querySelector(`div.status-dropdown[data-book="${bookNum}"]`)
  );
};

// Book object constructor
function Book(title, author, pagecount, readStatus) {
  this.title = title;
  this.author = author;
  if (pagecount) {
    this.pagecount = `${pagecount} pages`;
  } else {
    this.pagecount = '';
  }

  this.readStatus = readStatus;
}

// add book object to array and redraw library
function addBookToLibrary(title, author, pagecount, readStatus) {
  const myBook = new Book(title, author, pagecount, readStatus);
  myLibrary.push(myBook);

  displayLibrary();
}

// get the delete button's data-book value and remove that book from the array
const deleteBook = function (e) {
  myLibrary.splice(this.dataset.book, 1);
  displayLibrary();
};

// loop through myLIbrary and display on the page
function displayLibrary() {
  // first, we remove all elements in the library display window, called contentContainer
  contentContainer.textContent = '';

  // while (contentContainer.lastChild) {
  //     contentContainer.removeChild(contentContainer.lastChild)
  // }

  // initialize the number of books per row variable. This is not really necessary
  const bpr = numberOfBooksPerRow;

  // the outer loop draws the rows
  for (let i = 0; i < myLibrary.length / bpr; i++) {
    const libraryRow = document.createElement('div');
    libraryRow.classList.add('library-row', `row-${i + 1}`);

    // the inner loop draws each book element
    for (let j = 0; j < bpr; j++) {
      const bookIndex = j + i * bpr;

      // the inner loop will draw a maximum of 'bpr' books per row, but if there
      // aren't enough books to fill out the last row, this check will return false
      if (myLibrary[bookIndex]) {
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('book-container');
        bookContainer.setAttribute('data-book', bookIndex);

        // adding the html
        bookContainer.innerHTML = `
                <img data-book="${bookIndex}" src="./spotlight.png" alt="">
                <div class="book">
                    <div class="book-content-container">
                        <button data-book="${bookIndex}" class="delete-book-btn"></button>
                        <div class="book-content title"><h3>${myLibrary[bookIndex].title}</h3></div>
                        <h4 class="book-content author">${myLibrary[bookIndex].author}</h4>
                        
                        <div class="book-content status">
                            <h4 class="book-content pages">${myLibrary[bookIndex].pagecount}</h4>
                            <div data-book="${bookIndex}" class="book-content status-button">
                                <div data-book="${bookIndex}" data-readstatus="${myLibrary[bookIndex].readStatus}" class="book-content status-color"></div>
                            </div>
                            <div data-book="${bookIndex}" class="status-dropdown hidden">
                                <div data-book="${bookIndex}" class="status-dropdown-item">unread<div data-readstatus="unread" class="book-content status-color"></div></div>
                                <div data-book="${bookIndex}" class="status-dropdown-item">in progress<div data-readstatus="currently" class="book-content status-color"></div></div>
                                <div data-book="${bookIndex}" class="status-dropdown-item">finished<div data-readstatus="finished" class="book-content status-color"></div></div>
                            </div>
                        </div>
                    </div>
                </div>`;

        libraryRow.appendChild(bookContainer);
      }
    }
    contentContainer.appendChild(libraryRow);
  }

  // after the loops finish, we'll create and append one last row
  const libraryRow = document.createElement('div');
  libraryRow.classList.add('library-row', `row-final`);
  contentContainer.appendChild(libraryRow);

  // grab the newly created elements
  deleteBookBtns = document.querySelectorAll('button.delete-book-btn');
  statusButtons = document.querySelectorAll('.book-content.status-button');
  statusDropdownMenus = document.querySelectorAll('.status-dropdown-item');

  // then add the event listeners to the newly rendered books
  deleteBookBtns.forEach((item) => {
    item.addEventListener('click', deleteBook);
  });

  statusButtons.forEach((item) => {
    item.addEventListener('click', function (e) {
      const bookNum = this.dataset.book;
      const dropdownElement = document.querySelector(
        `div.status-dropdown[data-book="${bookNum}"]`
      );
      toggleVisibility(dropdownElement);
    });
  });

  statusDropdownMenus.forEach((item) => {
    item.addEventListener('click', changeReadStatus);
  });
}

// toggles visibility on all menu elements
const toggleVisibility = function (element) {
  if (element.className.includes('hidden')) {
    element.classList.remove('hidden');
    element.classList.add('visible');
  } else {
    element.classList.remove('visible');
    element.classList.add('hidden');
  }
};

addBookButton.addEventListener('click', () => {
  toggleVisibility(addBookDialogBox);
});

// gets the book information from the add book form, then calls the addBookTolibrary function
addBookForm.addEventListener(
  'submit',
  function (e) {
    e.preventDefault();
    const title = this[0].value;
    const author = this[1].value;
    const pagecount = document.querySelector('input#pagecount').value;
    const readStatus = document.querySelector(
      'input[name="readStatus"]:checked'
    ).value;

    addBookToLibrary(title, author, pagecount, readStatus);

    addBookForm.reset();
    toggleVisibility(addBookDialogBox);
  },
  false
);

// autopopulate the library with classic books
const autoPopulateLibrary = function () {
  const books = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      pagecount: '378 pages',
      readStatus: 'unread',
    },
    {
      title: 'To Kill A Mockingbird',
      author: 'Harper Lee',
      pagecount: '298 pages',
      readStatus: 'finished',
    },
    {
      title: 'Moby-Dick',
      author: 'Herman Melville',
      pagecount: '514 pages',
      readStatus: 'unread',
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      pagecount: '371 pages',
      readStatus: 'currently',
    },
    {
      title: 'Adventures of Huckleberry Finn',
      author: 'Mark Twain',
      pagecount: '213 pages',
      readStatus: 'unread',
    },
  ];

  books.forEach((book) => {
    myLibrary.push(book);
  });

  displayLibrary();
};

autoPopulateBtn.addEventListener('click', autoPopulateLibrary);

displayLibrary();
