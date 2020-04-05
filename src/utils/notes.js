const fs = require("fs");
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const jsonString = dataBuffer.toString();
        const jsonData = JSON.parse(jsonString);
        return jsonData;
    } catch (e) {
        return [];
    }   
};  

const saveNotes = notes => {
    const jsonData = JSON.stringify(notes);
    fs.writeFileSync("notes.json", jsonData);
};

const duplicate = title => {
    const notes = loadNotes();
    return notes.find( note => note.title === title);
};

const addNotes = (note, callback) => {
    ({title, body} = note);
    const notes = loadNotes();
    if(!notes.length){
        const newNotes = {
            title,
            body
        };
        notes.push(newNotes);
        saveNotes(notes);
        callback(undefined);
    }else{
        const isDuplicate = duplicate(note.title);
        if(isDuplicate){
            const error = {
                error: "you already added this you bitch"
            };
            callback(error);
        }else{
            const newNotes = {
                title,
                body
            };
            const notes = loadNotes();
            notes.push(newNotes);
            saveNotes(notes);
            const isAdded = true;
            callback(undefined);
        }
    }
};

const removeNotes = (title, callback) => {
  const isDuplicate = duplicate(title);  
  if(!isDuplicate){
      const error = {
        error: "This ain't here hoe"
      };
      callback(error, undefined); 
  }else{
      const notes = loadNotes();
      const newNotes = notes.filter(note => note.title !== title);
      saveNotes(newNotes);
      callback(undefined, newNotes);
  }
};

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    loadNotes: loadNotes
};