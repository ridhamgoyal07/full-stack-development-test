let add = document.getElementById('add');
let dynamicHtml = "";

let notesArea = document.getElementById("completenotes");

document.addEventListener('DOMContentLoaded', function () {
    showNotes();
});

add.addEventListener('click', function (e) {
    let newNote = document.getElementById("txtarea");
    let note = newNote.value;
    let previousNote = localStorage.getItem("notes");

    if (previousNote == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(previousNote);
    }
    if (note != "") {
        notesObj.push(note.trim());
        localStorage.setItem("notes", JSON.stringify(notesObj));
    }
    newNote.value = "";
    showNotes();

    e.preventDefault();
});


function showNotes() {
    // console.log("show method called");
    let mynotes = localStorage.getItem("notes");
    notesObj = JSON.parse(mynotes);
    // console.log(notesObj);
    dynamicHtml = "";
    notesObj.forEach(function (element, index) {
        dynamicHtml += `<div class="card notecard mx-2 my-2" style="width: 18rem;"><div class="card-body"><h5 class="card-title">Note ${index + 1}</h5><p class="card-text">${element}</p><button class="btn btn-primary" 
        id= ${index}  onclick=deleteNode(this.id)>Delete</bitton></div></div>`;
    });
    if (notesObj.length != 0) {
        notesArea.innerHTML = (dynamicHtml);
    }else {
        dynamicHtml = `<div class="container"> <div class="alert alert-warning alert-dismissible fade show" role="alert"><h5>No data found</h5><button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button><div></div>`;
        notesArea.innerHTML = dynamicHtml;
    }

}

function deleteNode(id){
    console.log(id);
    let previousNote = localStorage.getItem("notes");

    if (previousNote == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(previousNote);
    }
    notesObj.splice(id , 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

let search = document.getElementById("searchBox");
search.addEventListener("input" , function(){
    let inputVal =  search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("notecard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display = "block"; 
        }else{
            element.style.display = "none"; 
        }
    });
});