// Getting input from ze user:
const form = document.querySelector("form.form-inline");
const buttons = form.querySelectorAll("button");
const addBtn = buttons[0];
const removeBtn = buttons[1];

// API ROUTE LINKS:
const add = "/add?";
const remove = "/remove?title=";

// DOM MANIP:
const prompt = (message, color) => {
    const prompt = document.querySelector("div.prompt");
    prompt.style.display = "block";
    prompt.style.color = color;
    return prompt.textContent = `${message}`;        

};

const displayList = () => {
    const displayReq = "/loadNotes";
    fetch(displayReq).then( response => {
        response.json().then(({notes}) => {
            const notesPrompt = document.querySelector("div.text-monospace.text-bold > h1");
            const ol = document.querySelector("div.list-display > ol");
            if (notes.length === 0) {
                ol.innerHTML = "";
                return notesPrompt.textContent = "Got no notes son....";
            }
            notesPrompt.textContent = "Your Notes here: ";
            ol.innerHTML = "";
            console.log(notes);
            return notes.forEach(({title, body}) => {
                li = document.createElement("li");
                li.textContent = `${title}: ${body}`;
                ol.append(li);
            });
        });
    });
};

// CALLING THIS CUNT ONCE!!:
displayList();

// ADD API EVENT LISTENER:
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputFields = form.querySelectorAll("input.form-control.border-radius");
    const title = inputFields[0].value;
    const body = inputFields[1].value;
    const req = add + "title=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(body);
    addApi(req);
});

removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputFields = form.querySelectorAll("input.form-control.border-radius");
    const title = inputFields[0].value;
    const req = remove + encodeURIComponent(title);
    removeApi(req);
});

// api links
const addApi = addReq => {
    fetch(addReq).then(response => {
        response.json().then(({error, notes}) => {
            if (error) {
                return prompt(error, "red");                
            }
            prompt("You added a note!", "green");
            displayList();
        });
    });
}

const removeApi = removeReq => {
    fetch(removeReq).then(response => {
        response.json().then(({error, notes}) => {
            if (error) {
                return prompt(error, "red");
            }
            prompt("You removed a note!", "white");
            displayList();
        });
    });
}




// REMOVE API:



