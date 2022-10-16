const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach(note =>{
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    element.addEventListener("change", () =>{
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () =>{
        const doDelete = confirm("Delete note ?");

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent) {
    console.log("updating Note...")
    console.log(id, newContent);

    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
console.log("deleting Note...")
console.log(id);

    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}

//navigation responsive
const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');
    
    if(visibility === "false") {
        primaryNav.setAttribute("data-visible", true)
        navToggle.setAttribute('aria-expanded', true)
    } else if (visibility === "true"){
        primaryNav.setAttribute("data-visible", false)
        navToggle.setAttribute('aria-expanded', false)
    }
})
//nav animation
const nav = document.querySelector("#primary-navigation, .primary-header")
const sectionOne = document.querySelector(".logo")

const sectionOneOptions = {
    rootmargin:""
};

const sectionOneObserver = new IntersectionObserver(function(entries, sectionOneObserver) {
entries.forEach(entry => {
    if(!entry.isIntersecting) {
        nav.classList.add("nav-scrolled")
    }else {
        nav.classList.remove("nav-scrolled")
    }
})
}, sectionOneOptions)
sectionOneObserver.observe(sectionOne)
