const API_URL = "/api/books";

const form = document.getElementById("bookForm");
const table = document.getElementById("bookTable");

loadBooks();

form.addEventListener("submit", async (e) => {

e.preventDefault();

const id = document.getElementById("bookId").value;

const book = {
title: document.getElementById("title").value,
author: document.getElementById("author").value,
genre: document.getElementById("genre").value,
publishedYear: document.getElementById("publishedYear").value
};

if(id){

await fetch(API_URL + "/" + id,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(book)
});

}else{

await fetch(API_URL,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(book)
});

}

form.reset();
document.getElementById("bookId").value="";
loadBooks();

});

async function loadBooks(){

const res = await fetch(API_URL);
const books = await res.json();

table.innerHTML="";

books.forEach(b => {

const row = `
<tr>
<td>${b.title}</td>
<td>${b.author}</td>
<td>${b.genre}</td>
<td class="actions">
<button onclick="editBook('${b._id}')">Edit</button>
<button onclick="deleteBook('${b._id}')">Delete</button>
</td>
</tr>
`;

table.innerHTML += row;

});

}

async function deleteBook(id){

await fetch(API_URL + "/" + id,{
method:"DELETE"
});

loadBooks();

}

async function editBook(id){

const res = await fetch(API_URL + "/" + id);
const b = await res.json();

document.getElementById("bookId").value = b._id;
document.getElementById("title").value = b.title;
document.getElementById("author").value = b.author;
document.getElementById("genre").value = b.genre;
document.getElementById("publishedYear").value = b.publishedYear;

}