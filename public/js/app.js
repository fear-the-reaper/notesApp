// Getting input from ze user:
const forms = document.querySelectorAll("form.form-inline");
const addForm = forms[0];
const removeForm = forms[1];
const addBtn = addForm.querySelector("button");
const removeBtn = removeForm.querySelector("button");

// API ROUTE LINKS:
const add = "/add?";
const remove = "/remove?title=";

// DOM MANIP:
const prompt = (message, color) => {
    const prompt = document.querySelector("div.lead");
    const show = document.querySelector("div.prompt");
    show.style.display = "block";
    prompt.style.color = color;
    return prompt.textContent = `${message}`;        

};

const displayList = () => {
    const displayReq = "/loadNotes";
    fetch(displayReq).then( response => {
        response.json().then(({notes}) => {
            const notesPrompt = document.querySelector("div.col-12.display-4.p-2");
            const ol = document.querySelector("div.row.p-4");
            if (notes.length === 0) {
                ol.innerHTML = "";
                return notesPrompt.textContent = "Got no notes son....";
            }
            notesPrompt.textContent = "Your Notes here: ";
            ol.innerHTML = "";
            console.log(notes);
            return notes.forEach(({title, body}) => {
                template = `
                <div class="col-lg-3 col-md-6 col-sm-12 mb-2">
                    <div class="card">
                        <h5 class="card-header">${title}</h5>
                        <div class="card-body">
                            <p class="card-text">${body}.</p>
                        </div>
                    </div>
                </div>
                `
                ol.innerHTML += template;
            });
        });
    });
};

// CALLING THIS CUNT ONCE!!:
displayList();

// ADD API EVENT LISTENER:
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputFields = addForm.querySelectorAll("input.form-control");
    const title = inputFields[0].value;
    const body = inputFields[1].value;
    const req = add + "title=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(body);
    addApi(req);
});

removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputFields = removeForm.querySelectorAll("input.form-control");
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

// REMOVE API:
const removeApi = removeReq => {
    fetch(removeReq).then(response => {
        response.json().then(({error, notes}) => {
            if (error) {
                return prompt(error, "blue");
            }
            prompt("You removed a note!", "red");
            displayList();
        });
    });
}







