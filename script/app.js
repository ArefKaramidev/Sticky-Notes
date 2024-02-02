const app = document.querySelector("#app");
const addNote = document.querySelector("#add-note");

addNote.addEventListener("click", () => addNotes());

const getNotes = () => {
  return JSON.parse(localStorage.getItem("notes") || "[]");
};

const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const createElemente = (id, content) => {
  const noteElement = document.createElement("textarea");

  noteElement.classList.add("note");

  noteElement.value = content;

  noteElement.addEventListener("change", () => {
    updateNotes(id, noteElement.value);
  });

  noteElement.addEventListener("dblclick", () => {
    removeNotes(id, noteElement);
  });

  return noteElement;
};

const addNotes = () => {
  const elemente = getNotes();

  notesItem = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const newEle = createElemente(notesItem.id, notesItem.content);
  app.insertBefore(newEle, addNote);
  elemente.push(notesItem);
  saveNotes(elemente);
};

const updateNotes = (id, newContent) => {
  const notes = getNotes();
  const noteContent = notes.filter((item) => item.id === id)[0];
  noteContent.content = newContent;
  saveNotes(notes);
};

const removeNotes = (id, elemente) => {
  const note = getNotes();
  const notes = note.filter((item) => item.id === id);
  saveNotes(notes);
  app.removeChild(elemente);
};
getNotes().forEach((item) => {
  const elemente = createElemente(item.id, item.content);
  app.insertBefore(elemente, addNote);
});
