const URL = 'http://localhost:8081';
let users = [];

let entries = [];
let projects = [];
let rapports = [];

let entryMode = 'create';
let projectMode = 'create';
let rapportMode = 'create';

let currentEntry;
let currentProject;
let currentRapport;

const dateAndTimeToDate = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}`).toISOString();
};

const getHeaders = () => {
    let token = localStorage.getItem('bearer');
    let headers = {}
    if (token !== null) headers['Authorization'] = token;
    return headers;
}


// API Requests
const createEntry = (entry) => {
    let headers = getHeaders();
    headers['Content-Type'] = 'application/json';
    fetch(`${URL}/entries`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(entry)
    }).then((result) => {
        result.json().then((entry) => {
            entries.push(entry);
            renderEntries();
        });
    });
};

const createProject = (project) => {
    let headers = getHeaders();
    headers['Content-Type'] = 'application/json';
    fetch(`${URL}/projects`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(project)
    }).then((result) => {
        result.json().then((project) => {
            projects.push(project);
            indexProjects();
            renderProjects();
        });
    });
};

const createRapport = (rapport) => {
    let headers = getHeaders();
    headers['Content-Type'] = 'application/json';
    fetch(`${URL}/rapports`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(rapport)
    }).then((result) => {
        result.json().then((rapport) => {
            rapports.push(rapport);
            renderRapports();
        });
    });
};


const testentry = {
    "checkIn": "2021-09-07T09:16:00.000Z",
    "checkOut": "2021-09-17T12:13:00.000Z",
    "user": {
        "id": "1"
    }
}

const testproject = {
    "identifier": "devops"
}

const testrapport = {
    "workload": "3",
    "user": {
        "id": "1"
    },
    "project": {
        "id": "1"
    }
}

const testentryresp = {
    "id": 1,
    "checkIn": "2021-09-07T09:16:00",
    "checkOut": "2021-09-17T12:13:00",
    "user": {
        "id": 1,
        "username": null,
        "password": null
    }
}

const testuser = {
    "username": "testuser",
    "password": "password"
}

const deleteEntry = (id) => {
    let headers = getHeaders();
    fetch(`${URL}/entries/${id}`, {
        method: 'DELETE',
        headers: headers
    }).then((result) => {
        indexEntries();
    });
};

const deleteProject = (id) => {
    let headers = getHeaders();
    fetch(`${URL}/projects/${id}`, {
        method: 'DELETE',
        headers: headers
    }).then((result) => {
        indexProjects();
    });
};

const deleteRapport = (id) => {
    let headers = getHeaders();
    fetch(`${URL}/rapports/${id}`, {
        method: 'DELETE',
        headers: headers
    }).then((result) => {
        indexRapports();
    });
};

const updateEntry = (entry) => {
    let headers = getHeaders();
    headers['Content-Type'] = 'application/json';
    fetch(`${URL}/entries/${entry.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(entry)
    }).then((result) => {
        result.json().then((entry) => {
            entries = entries.map((e) => e.id === entry.id ? entry : e);
            renderEntries();
        });
    });
}

const updateProject = (project) => {
    let headers = getHeaders();
    headers['Content-Type'] = 'application/json';
    fetch(`${URL}/projects/${project.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(project)
    }).then((result) => {
        result.json().then((project) => {
            projects = projects.map((e) => e.id === project.id ? project : e);
            indexProjects();
            renderProjects();
        });
    });
}

const updateRapport = (rapport) => {
    let headers = getHeaders();
    headers['Content-Type'] = 'application/json';
    fetch(`${URL}/rapports/${rapport.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(rapport)
    }).then((result) => {
        result.json().then((rapport) => {
            rapports = rapports.map((e) => e.id === rapport.id ? rapport : e);
            renderRapports();
        });
    });
}


const resetEntryForm = () => {
    const entryForm = document.querySelector('#createEntryForm');
    entryForm.reset();
    entryMode = 'create';
    currentEntry = null;
}

const resetProjectForm = () => {
    const projectForm = document.querySelector('#createProjectForm');
    projectForm.reset();
    projectMode = 'create';
    currentProject = null;
}

const resetRapportForm = () => {
    const rapportForm = document.querySelector('#createRapportForm');
    rapportForm.reset();
    rapportMode = 'create';
    currentRapport = null;
}


const getUserById = (id) => {
    return users.find((user) => { return user.id == id });
}

const getProjectById = (id) => {
    return projects.find((project) => { return project.id == id });
}

const getRapportById = (id) => {
    return rapports.find((rapport) => { return rapport.id == id });
}




const saveEntryForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = {};
    entry['checkIn'] = dateAndTimeToDate(formData.get('checkInDate'), formData.get('checkInTime'));
    entry['checkOut'] = dateAndTimeToDate(formData.get('checkOutDate'), formData.get('checkOutTime'));
    entry['user'] = getUserById(formData.get('user'));

    if (entryMode === 'create') {
        createEntry(entry);
    } else {
        entry.id = currentEntry.id;
        updateEntry(entry);
    }
    resetEntryForm();
}

const saveRapportForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rapport = {};
    rapport['user'] = getUserById(formData.get('user'));
    rapport['project'] = getProjectById(formData.get('project'));
    rapport['workload'] = formData.get('workload');

    if (rapportMode === 'create') {
        createRapport(rapport);
    } else {
        rapport.id = currentRapport.id;
        updateRapport(rapport);
    }
    resetRapportForm();
}

const saveProjectForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const project = {};
    project['identifier'] = formData.get('identifier');

    if (projectMode === 'create') {
        createProject(project);
    } else {
        project.id = currentProject.id;
        updateProject(project);
    }
    resetProjectForm();
}


const editEntry = (entry) => {
    entryMode = 'edit';
    currentEntry = entry;
    const entryForm = document.querySelector('#createEntryForm');
    const checkInDateField = entryForm.querySelector('[name="checkInDate"]');
    checkInDateField.value = entry.checkIn.split('T')[0];
    const checkInTimeField = entryForm.querySelector('[name="checkInTime"]');
    checkInTimeField.value = entry.checkIn.split('T')[1].slice(0, -3);
    const checkOutDateField = entryForm.querySelector('[name="checkOutDate"]');
    checkOutDateField.value = entry.checkOut.split('T')[0];
    const checkOutTimeField = entryForm.querySelector('[name="checkOutTime"]');
    checkOutTimeField.value = entry.checkOut.split('T')[1].slice(0, -3);
    const userSelectField = entryForm.querySelector('[name="user"]');
    userSelectField.value = entry.user.id;
}

const editRapport = (rapport) => {
    rapportMode = 'edit';
    currentRapport = rapport;
    const rapportForm = document.querySelector('#createRapportForm');
    const userSelectField = rapportForm.querySelector('[name="user"]');
    userSelectField.value = rapport.user.id;
    const projectSelectField = rapportForm.querySelector('[name="project"]');
    projectSelectField.value = rapport.project.id;
    const workloadField = rapportForm.querySelector('[name="workload"]');
    workloadField.value = rapport.workload;
}

const editProject = (project) => {
    projectMode = 'edit';
    currentProject = project;
    const projectForm = document.querySelector('#createProjectForm');
    const identifierField = projectForm.querySelector('[name="identifier"]');
    identifierField.value = project.identifier;
}


const createEntryActions = (entry) => {
    const cell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteEntry(entry.id));
    cell.appendChild(deleteButton);
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => editEntry(entry));
    cell.appendChild(editButton);
    return cell;
}


const createRapportActions = (rapport) => {
    const cell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteRapport(rapport.id));
    cell.appendChild(deleteButton);
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => editRapport(rapport));
    cell.appendChild(editButton);
    return cell;
}

const createProjectActions = (project) => {
    const cell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteProject(project.id));
    cell.appendChild(deleteButton);
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => editProject(project));
    cell.appendChild(editButton);
    return cell;
}


const indexEntries = () => {
    let headers = getHeaders();
    fetch(`${URL}/entries`, {
        method: 'GET',
        headers: headers
    }).then((result) => {
        result.json().then((result) => {
            entries = result;
            renderEntries();
        });
    });
    renderEntries();
};

const indexProjects = () => {
    let headers = getHeaders();
    fetch(`${URL}/projects`, {
        method: 'GET',
        headers: headers
    }).then((result) => {
        result.json().then((result) => {
            projects = result;
            renderProjects();
            populateProjectsDropdown();
        });
    });
    renderProjects();
};

const indexRapports = () => {
    let headers = getHeaders();
    fetch(`${URL}/rapports`, {
        method: 'GET',
        headers: headers
    }).then((result) => {
        result.json().then((result) => {
            rapports = result;
            renderRapports();
        });
    });
    renderRapports();
};


const indexUsers = () => {
    let headers = getHeaders();
    fetch(`${URL}/users`, {
        method: 'GET',
        headers: headers
    }).then((result) => {
        result.json().then((result) => {
            users = result;
            populateUserDropdown();
        });
    });
};

const populateUserDropdown = () => {
    const usersDropdownEntry = document.querySelector('#userSelectEntry');
    const usersDropdownRapport = document.querySelector('#userSelectRapport');

    for (var i = usersDropdownEntry.options.length - 1; i >= 0; i--) {
        usersDropdownEntry.remove(i);
    }

    for (var i = usersDropdownRapport.options.length - 1; i >= 0; i--) {
        usersDropdownRapport.remove(i);
    }
    //Create and append the options
    for (var i = 0; i < users.length; i++) {
        var optionEntry = document.createElement("option");
        optionEntry.value = users[i]['id'];
        optionEntry.text = users[i]['username'];
        usersDropdownEntry.appendChild(optionEntry);

        var optionRapport = document.createElement("option");
        optionRapport.value = users[i]['id'];
        optionRapport.text = users[i]['username'];
        usersDropdownRapport.appendChild(optionRapport);
    }
}

const populateProjectsDropdown = () => {
    const projectsDropdownRapport = document.querySelector('#projectSelectRapport');

    //remove all options
    for (var i = projectsDropdownRapport.options.length - 1; i >= 0; i--) {
        projectsDropdownRapport.remove(i);
    }

    //Create and append the options
    for (var i = 0; i < projects.length; i++) {
        var optionRapport = document.createElement("option");
        optionRapport.value = projects[i]['id'];
        optionRapport.text = projects[i]['identifier'];
        projectsDropdownRapport.appendChild(optionRapport);
    }
}

const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerText = text;
    return cell;
};

const renderEntries = () => {
    const display = document.querySelector('#entryDisplay');
    display.innerHTML = '';
    entries.forEach((entry) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(entry.id));
        row.appendChild(createCell(entry.user.username));
        row.appendChild(createCell(new Date(entry.checkIn).toLocaleString()));
        row.appendChild(createCell(new Date(entry.checkOut).toLocaleString()));
        row.appendChild(createEntryActions(entry));
        display.appendChild(row);
    });
};


const renderRapports = () => {
    const display = document.querySelector('#rapportDisplay');
    display.innerHTML = '';
    rapports.forEach((rapport) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(rapport.id));
        row.appendChild(createCell(rapport.user.username));
        row.appendChild(createCell(rapport.project.identifier));
        row.appendChild(createCell(rapport.workload));
        row.appendChild(createRapportActions(rapport));
        display.appendChild(row);
    });
};

const renderProjects = () => {
    const display = document.querySelector('#projectDisplay');
    display.innerHTML = '';
    projects.forEach((project) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(project.id));
        row.appendChild(createCell(project.identifier));
        row.appendChild(createProjectActions(project));
        display.appendChild(row);
    });
};



const checkAuthorized = () => {
    if (localStorage.getItem('bearer') === null) {
        window.location.href = `${URL}/login.html`
    }

}

const logout = () => {
    localStorage.removeItem('bearer');
    checkAuthorized();
}

document.addEventListener('DOMContentLoaded', function () {
    //checkAuthorized();
    //const createEntryForm = document.querySelector('#createEntryForm');
    //createEntryForm.addEventListener('submit', createEntry);

    const entryForm = document.querySelector('#createEntryForm');
    entryForm.addEventListener('submit', saveEntryForm);
    entryForm.addEventListener('reset', resetEntryForm);
    indexEntries();

    const projectForm = document.querySelector('#createProjectForm');
    projectForm.addEventListener('submit', saveProjectForm);
    projectForm.addEventListener('reset', resetProjectForm);
    indexProjects();

    const rapportForm = document.querySelector('#createRapportForm');
    rapportForm.addEventListener('submit', saveRapportForm);
    rapportForm.addEventListener('reset', resetRapportForm);
    indexRapports();


    const logoutButton = document.querySelector('#logout-button');
    logoutButton.addEventListener('click', logout);

    indexUsers();
    populateUserDropdown();
    populateProjectsDropdown();
});

let timer, currSeconds = 0;

function resetTimer() {

    /* Hide the timer text */
    document.querySelector(".timertext")
        .style.display = 'none';

    /* Clear the previous interval */
    clearInterval(timer);

    /* Reset the seconds of the timer */
    currSeconds = 0;

    /* Set a new interval */
    timer =
        setInterval(startIdleTimer, 3000);
}

// Define the events that
// would reset the timer
window.onload = resetTimer;
window.onmousemove = resetTimer;
window.onmousedown = resetTimer;
window.ontouchstart = resetTimer;
window.onclick = resetTimer;
window.onkeypress = resetTimer;

function showSessionTimeoutMsg() {
  //  logout();
    alert("your session has been expired");
}
function startIdleTimer() {

    /* Increment the
        timer seconds */
    currSeconds++;

    /* Set the timer text
        to the new value */
    document.querySelector(".secs")
        .textContent = currSeconds;
 //  showSessionTimeoutMsg();

}

