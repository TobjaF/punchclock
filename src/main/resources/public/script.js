const URL = 'http://localhost:8081';
let entries = [];
let users = [];
let mode = 'create';
let currentEntry;

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
    console.log('entry');
    console.log(entry);
    console.log(JSON.stringify(entry));
    let headers = getHeaders();
    headers['Content-Type'] =  'application/json';
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

const testentry = {
    "checkIn": "2021-09-07T09:16:00.000Z",
    "checkOut": "2021-09-17T12:13:00.000Z",
    "user": {
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
    "username":"testuser",
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


// Rendering
const resetForm = () => {
    const entryForm = document.querySelector('#createEntryForm');
    entryForm.reset();
    mode = 'create';
    currentEntry = null;
}

const getUserById = (id) => {
    return users.find((user) => {return user.id === id});
}

const saveForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = {};
    entry['checkIn'] = dateAndTimeToDate(formData.get('checkInDate'), formData.get('checkInTime'));
    entry['checkOut'] = dateAndTimeToDate(formData.get('checkOutDate'), formData.get('checkOutTime'));
    entry['user'] = getUserById(formData.get('user'));

    if (mode === 'create') {
        createEntry(entry);
    } else {
        entry.id = currentEntry.id;
        updateEntry(entry);
    }
    resetForm();
}

const editEntry = (entry) => {
    mode = 'edit';
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
}

const createActions = (entry) => {
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

const indexUsers = () => {
    let headers = getHeaders();
    fetch(`${URL}/users`, {
        method: 'GET',
        headers: headers
    }).then((result) => {
        result.json().then((result) => {
            users = result;
            populateUserDropdown()
            console.log('Users: ');
            console.log(users);
        });
    });
};


const populateUserDropdown = () => {
    const usersDropdwon = document.querySelector('#userselect');
    //Create and append the options
    for (var i = 0; i < users.length; i++) {
        var option = document.createElement("option");
        option.value = users[i]['id'];
        option.text = users[i]['username'];
        usersDropdwon.appendChild(option);
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
        row.appendChild(createActions(entry));
        display.appendChild(row);
    });
};



document.addEventListener('DOMContentLoaded', function(){
    //const createEntryForm = document.querySelector('#createEntryForm');
    //createEntryForm.addEventListener('submit', createEntry);

    const entryForm = document.querySelector('#createEntryForm');
    entryForm.addEventListener('submit', saveForm);
    entryForm.addEventListener('reset', resetForm);
    indexEntries();

    console.log('Bearer: ');
    console.log(localStorage.getItem('bearer'));

    indexUsers();
    populateUserDropdown();
});