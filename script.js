document.getElementById('book-form').addEventListener('submit', function(event) 
{
  event.preventDefault(); //when we clcik the add button or clear button by default the page gets loaded
  addBook();              //in order to stop the reload ...we have used event.preventDefault()
  clearInputs();
});

//ADD BUTTON FUNCTION
function addBook() {
  event.preventDefault();
  
  const bookTitle = document.getElementById('book-title').value;
  const author = document.getElementById('Author').value;
  const genre = document.getElementById('book-genre').value;
  const year = document.getElementById('year').value;
  const quantity = document.getElementById('quantity').value;
  
  const books = JSON.parse(localStorage.getItem('books')) || [];
  
  // Check if the book already exists
  if (books.find((book) => book.title === bookTitle && book.author === author)) {
    alert('Book already exists!');
    return;
  }
  
  // Create a new table row
  const row = document.createElement('tr');
  
  // Add or append the data to the table row
  row.innerHTML = `
    <td>${bookTitle}</td>
    <td>${author}</td>
    <td>${genre}</td>
    <td>${year}</td>
    <td>${quantity}</td>
    <td>
      <button class="delete-button" onclick="deleteBook(this)">Delete</button>
    </td>
  `;
  
  // Append the table row to the table body
  document.getElementById('table-body').appendChild(row);
  
  // Store the data in local storage
  books.push({ title: bookTitle, author: author, genre: genre, year: year, quantity: quantity });
  localStorage.setItem('books', JSON.stringify(books));
}

//CLEAR BUTTON FUNCTION
function clearInputs()
 {
  document.getElementById('book-title').value = '';
  document.getElementById('Author').value = '';
  document.getElementById('book-genre').value = '';
  document.getElementById('year').value = '';
  document.getElementById('quantity').value = '';
}

//DELETE BUTTON FUNCTION
function deleteBook(button) 
{
  // Get the row of the book to be deleted
  const row = button.parentNode.parentNode;

  if (confirm("Are you sure you want to delete this book?")) 
  {
    document.getElementById('table-body').removeChild(row);
    const books = JSON.parse(localStorage.getItem('books'));
    const index = books.findIndex((book) => book.title === row.cells[0].textContent); 
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Retrieve data from local storage and display it
const storedBooks = JSON.parse(localStorage.getItem('books'));
if (storedBooks) {
  storedBooks.forEach((book) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>${book.year}</td>
      <td>${book.quantity}</td>
      <td>
        <button class="delete-button" onclick="deleteBook(this)">Delete</button>
      </td>
    `;
    document.getElementById('table-body').appendChild(row);
  });
}

//ADMIN ANS USER ACCOUNT POPUP WINDOW
const userAccountBtn = document.getElementById('user-account-btn');
const adminInfo = document.getElementById('admin-info');
const closeBtn = document.getElementById('close-btn');
const logoutBtn = document.getElementById('logout-btn');

userAccountBtn.addEventListener('click', function()
 {
  adminInfo.style.display = 'block'; 
});

closeBtn.addEventListener('click', function() 
{
  adminInfo.style.display = 'none';
});

logoutBtn.addEventListener('click', function()
 {
  window.location.href = 'Admin-login.html'; 
});

//EDIT BUTTON IN THE USER POPUP ACCOUNT INFO
function editUser() {
  var currentName = document.getElementById("name").innerText.split(":")[1].trim();
  var currentEmail = document.getElementById("email").innerText.split(":")[1].trim();
  var currentRole = document.getElementById("role").innerText.split(":")[1].trim();

  var Name = window.prompt("Enter User name?", currentName);
  var Email = window.prompt("Enter User Email?", currentEmail);
  var Role = window.prompt("Enter User Role?", currentRole);

  if (Name === "") Name = currentName;
  if (Email === "") Email = currentEmail;
  if (Role === "") Role = currentRole;

  document.getElementById("name").innerText = ` User Name: ${Name}`;
  document.getElementById("email").innerText = `User Email: ${Email}`;
  document.getElementById("role").innerText = `User Role: ${Role}`;
}


function editAdmin()
 {
  var currentName = document.getElementById("name").innerText.split(":")[1].trim();
  var currentEmail = document.getElementById("email").innerText.split(":")[1].trim();
  var currentRole = document.getElementById("role").innerText.split(":")[1].trim();

  var Name = window.prompt("Enter Admin name?", currentName);
  var Email = window.prompt("Enter Admin Email?", currentEmail);
  var Role = window.prompt("Enter Admin Role?", currentRole);

  if (Name === "") Name = currentName;
  if (Email === "") Email = currentEmail;
  if (Role === "") Role = currentRole;

  document.getElementById("name").innerText = ` Admin Name: ${Name}`;
  document.getElementById("email").innerText = `Admin Email: ${Email}`;
  document.getElementById("role").innerText = `Admin Role: ${Role}`;
}


//FUNCTION FOR AVAILABLE BOOKS
function availdata() 
{
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  books.forEach((book) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>${book.year}</td>
      <td>${book.quantity}</td>
    `;
    tableBody.appendChild(row);
  });
  document.querySelector('.data-table').style.display = 'block';
}


let borrowedBooksCount = 0;
let borrowedBooks = [];

function borrowBook()
 {
  if (borrowedBooksCount >= 2) {
    alert('You have already borrowed 2 books!');
    return;
  }

  const bookTitle = document.getElementById('book-title').value;
  const author = document.getElementById('Author').value;

  const availableBooks = JSON.parse(localStorage.getItem('books')) || [];
  const book = availableBooks.find((book) => book.title === bookTitle && book.author === author);

  if (!book || book.quantity === 0) {
    alert('Book not available!');
    return;
  }
  
  if (borrowedBooks.includes(bookTitle)) {
    alert('You have already borrowed this book!');
    return;
  }
  book.status = 'Borrowed';

  const borrowedBookTable = document.getElementById('borrowed-book-table');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${bookTitle}</td>
    <td>${author}</td>
    <td>Borrowed</td>
  `;
  borrowedBookTable.appendChild(newRow);
  document.getElementById('borrowed-books').style.display = 'block';
  borrowedBooksCount++;
  borrowedBooks.push(bookTitle);

  if (book.quantity === 0) {
    alert('Book not available!');
  } 
}



window.onload = function()
 {
  borrowedBooksCount = 0;
  borrowedBooks = [];
};





 
