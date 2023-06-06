const addBookButton = document.getElementById('add-book-container');
const addBookDialogBox = document.getElementById('add-book-dialog-box');
const addBookForm = document.getElementById('add-book-form')
const submitBtn = document.getElementById('formsubmit');
const contentContainer = document.getElementById('content-container');

const statusDropdownMenu = document.querySelectorAll('.status-dropdown-item')

statusDropdownMenu.forEach((item) => {
    item.addEventListener('mouseover', (e) => {
        console.log(`${this} and ${e}`)
        item.style.backgroundColor = 'red';
    })
})

let deleteBookBtns;

let myLibrary = [];



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

// add book object to array
function addBookToLibrary(title, author, pagecount, readStatus) {
    const myBook = new Book(title, author, pagecount, readStatus);
    myLibrary.push(myBook);

    displayLibrary()
    
}

function displayLibrary() {
    // loop through myLIbrary and display on the page

    // while (contentContainer.lastChild) {
    //     contentContainer.removeChild(contentContainer.lastChild)
    // }

    let numBooksPerRow = 3;

    for (let i = 0; i < (myLibrary.length / numBooksPerRow); i++) {

        const libraryRow = document.createElement('div')
        libraryRow.classList.add('library-row', `row-${i + 1}`)


        for (let j = 0; j < numBooksPerRow; j++) {

            if (myLibrary[j+(i*numBooksPerRow)]) {
                const bookContainer = document.createElement('div')
                bookContainer.classList.add('book-container')
                bookContainer.innerHTML = 
                    `<img src="./spotlight3.png" alt="">
                    <div class="book">
                        <div class="book-content-container">
                            <button class="delete-book-btn" data-book="${j+(i*numBooksPerRow)}"></button>
                            <div class="book-content title"><h3>${myLibrary[j+(i*numBooksPerRow)].title}</h3></div>
                            <h4 class="book-content author">${myLibrary[j+(i*numBooksPerRow)].author}</h4>
                            <h4 class="book-content pages">${myLibrary[j+(i*numBooksPerRow)].pagecount}</h4>
                            <h4 class="book-content status">Status: ${myLibrary[j+(i*numBooksPerRow)].readStatus}</h4>
                        </div>
                    </div>`
                
                libraryRow.appendChild(bookContainer)
            }
        }
        contentContainer.appendChild(libraryRow)
        deleteBookBtns = document.querySelectorAll('button.delete-book-btn');

    }

    // add the event listeners to the newly rendered books
    deleteBookBtns.forEach((item) => {
        item.addEventListener('click', deleteBook)
    })
}

// get the delete button's data-book value and remove that book from the array
const deleteBook = function(e) {
    myLibrary.splice(this.dataset.book, 1)
    displayLibrary()
}



const toggleAddBookDialog = function(e) {
    let changeTo = '';
    
    if (addBookDialogBox.classList.contains('hidden')) {
        changeTo = 'visible';
        addBookDialogBox.classList.remove('hidden')
     } else {
        changeTo = 'hidden';
        addBookDialogBox.classList.remove('visible')
     }

    addBookDialogBox.style.visibility = changeTo;
    addBookDialogBox.classList.add(changeTo)
}

addBookButton.addEventListener('click', toggleAddBookDialog);

// submitBtn.addEventListener('click', (e) => {
//     e.preventDefault;
// })

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = e.target[0].value
    const author = e.target[1].value
    const pagecount = e.target[2].value
    const readStatus = document.querySelector('input[name="readStatus"]:checked').value;

    addBookToLibrary(title, author, pagecount, readStatus)

}, false)


books = [
    {
        'title': 'The Great Gatsby',
        'author': 'F. Scott Fitzgerald',
        'pagecount': 378,
        'readStatus': 'unread',
    },
    {
        'title': 'To Kill A Mockingbird',
        'author': 'Harper Lee',
        'pagecount': 298,
        'readStatus': 'unread',
    },
    {
        'title': 'Moby-Dick',
        'author': 'Herman Melville',
        'pagecount': 514,
        'readStatus': 'unread',
    },
    {
        'title': 'Pride and Prejudice',
        'author': 'Jane Austen',
        'pagecount': 371,
        'readStatus': 'unread',
    },
    {
        'title': 'Adventures of Huckleberry Finn',
        'author': 'Mark Twain',
        'pagecount': 213,
        'readStatus': 'unread',
    },
]

books.forEach((book) => {
    myLibrary.push(book)
})
displayLibrary()

// Add a “NEW BOOK” button that brings up a form allowing users to input the details 
// for the new book: author, title, number of pages, whether it’s been read and anything 
// else you might want.

// Add a button on each book’s display to remove the book from the library.

// Add a button on each book’s display to change its read status.
// To facilitate this you will want to create the function that toggles a 
// book’s read status on your Book prototype instance.