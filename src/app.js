const express = require("express");
const path = require("path");
const hbs = require("hbs");
const notesApi = require("./utils/notes.js");

const app = express();

const mainPage = path.join(__dirname, "../public");
const templates = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", templates);
hbs.registerPartials(partials);
app.use(express.static(mainPage));


// Page-Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about", {
        header1: "About me",
        header2: "Application information",
        header3: "Other Apps"
    });
});


app.get("/help", (req, res) => {
    res.render("help", {
        header1: "Adding a note",
        header2: "Removing a note",
        header3: "Seeing the list"
    });
});
// HTTPS API End-points 
app.get("/add", (req, res) => {
    ({title, body} = req.query);
    if(!(title) || !(body)){
        return res.send({
            error: "put a title and body you fucking retard"
        });
    }
    const note = {
        title,
        body
    };
    notesApi.addNotes(note, error => {
        if(!error){
            const notes = notesApi.loadNotes();
            return res.send({notes});
        }
        res.send(error);
        
    });
});

app.get("/remove", (req, res) => {
    ({title} = req.query);
    if(!title){
        return res.send({
            error: "give me a title to delete jackass"
        });
    }
    notesApi.removeNotes(title, (error, notes) => {
    if(error){
        return res.send(error);
    }
    const newNotes = notesApi.loadNotes()
    res.send({newNotes});    
    });
});

app.get("/loadNotes", (req, res) => {
   const notes = notesApi.loadNotes();
   res.send({notes});
});

app.listen(3000, ()=> {
    console.log("server listening @ 3000!");
});