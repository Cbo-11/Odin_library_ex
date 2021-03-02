
//Books array set up 
let myLibrary = [];
var newBook;

//constructor
class Book {
    constructor(title,author,pages,read) {
        this.title = title;
        this.author = author
        this.pages = pages;
        this.read = read;
    }
}

//add book to library function 
function addBookToLibrary() {
    event.preventDefault();
    inputOverlay.style.display = "none";

    newBook = getFromInput();
    myLibrary.push(newBook);
    console.log(myLibrary);
    localData();
    render();
    form.reset();
}

function getFromInput() {
    const title =  document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    return  new Book (title, author, pages, read);
  }

//event listeners
// Get overlay id variable
var overlay = document.getElementById("inputOverlay");
// Get the button that opens the modal
var btn = document.getElementById("new-book");
// Get the <span> element that closes the overlay
var span = document.getElementsByClassName("close")[0];
// Get form submit button
var submit = document.getElementById("submit");

// When the user clicks on the button, open the overlay
btn.onclick = function() {
    inputOverlay.style.display = "block";
}

submit.onclick = function() {
    addBookToLibrary();
    inputOverlay.style.display = "none";
}

span.onclick = function() {
    inputOverlay.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == inputOverlay) {
        inputOverlay.style.display = "none";
  }
}

// Render library on page
function render(){

    const libraryContainer = document.getElementById('library_contain');
    const books = document.querySelectorAll('.book');

    books.forEach(book=> libraryContainer.removeChild(book));
    
    for (let i=0; i<myLibrary.length; i++){
        createLibrary(myLibrary[i]);
    }
}


// create library from array value
function createLibrary(a){
    //Create DOM elements for book
    const library = document.getElementById('library_contain');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const buttonsDiv = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    //create book class and give id
    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(a));
    
    // assign values and append child div to book div 
    titleDiv.textContent = 'Title: '+a.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authDiv.textContent = 'Author: '+a.author;
    authDiv.classList.add('author');
    bookDiv.appendChild(authDiv);

    pagesDiv.textContent = 'Pages: '+ a.pages ;
    pagesDiv.classList.add('pages');
    bookDiv.appendChild(pagesDiv);

    readBtn.classList.add('readBtn');
    buttonsDiv.setAttribute("class", "btn-toolbar");
    buttonsDiv.appendChild(readBtn);
    readBtn.setAttribute("type","button");

    if(a.read == true){
        readBtn.textContent = 'Read'; 
        readBtn.setAttribute("class", "btn btn-success  btn-sm")
    } else { 
        readBtn.textContent = 'Unread'; 
        readBtn.setAttribute("class", "btn btn-secondary  btn-sm");
    }

    removeBtn.textContent = 'Remove'; 
    removeBtn.setAttribute('id', 'removeBtn');
    removeBtn.setAttribute("type","button");
    removeBtn.setAttribute("class", "btn btn-light btn-sm");
    buttonsDiv.appendChild(removeBtn);
    bookDiv.appendChild(buttonsDiv);

    //append into library element
    library.appendChild(bookDiv);

    //button events 
    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(a),1);
        localData();
        render();
    });

    readBtn.addEventListener('click', () => { 
        a.read = !a.read; 
        render();
    }); 
};

// set data to local storage 
function localData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
};

function restore() {
    if(!localStorage.myLibrary) {
        render();
    }else {
        let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();