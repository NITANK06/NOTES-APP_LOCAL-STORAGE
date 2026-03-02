const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const errorMsg = document.getElementById("errorMsg");

document.addEventListener("DOMContentLoaded", loadNotes);

addNoteBtn.addEventListener("click", addNote);

function getNotes() {
    return JSON.parse(localStorage.getItem("notes")) || [];
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        errorMsg.textContent = "Note cannot be empty!";
        return;
    }

    errorMsg.textContent = "";

    const notes = getNotes();
    notes.push(noteText);
    saveNotes(notes);

    noteInput.value = "";
    loadNotes();
}

function loadNotes() {
    notesContainer.innerHTML = "";

    const notes = getNotes();

    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        noteDiv.innerHTML = `
            ${note}
            <button class="delete-btn" onclick="deleteNote(${index})">X</button>
        `;

        notesContainer.appendChild(noteDiv);
    });
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    loadNotes();
}
