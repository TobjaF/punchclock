const URL = 'http://localhost:8081';

// Simulate a mouse click:
// window.location.href = "http://www.w3schools.com";
/*
Mehrere html-files für verschiedene Ansichten und jeweils ein dazu assoziiertes js-file.
die js-files können sich den local storage teilen.
* Im index.html-javascript zu beginn einen fetch absetzen, um zu prüfen, ob wer angemeldet ist, falls nicht, auf loginpage navigieren
--> zu beginn den local storage abfragen nach einem jwt-token.
--> falls ein jwt vorhanden ist, die dashboard-seite aufrufen
    falls nicht, eine Startseite mit sign-in / sign-up Knöpfen
--> immer, wenn bei einem request ein access-denied (unauthorized 403?) code zurückkommt, soll auf eine Fehlerseite verwiesen werden.


*
* // Store
localStorage.setItem("lastname", "Smith");
// Retrieve
localStorage.getItem("lastname");
*

bootstrap: javascript und css einbinden, dann im html die bootstrap-components verwenden.



* Local storage works on a per domain basis (not per page) so any HTML pages will share the same LocalStorage database as long as they are on the same domain.
*
*
*
*
* */
const test_fetch = () => {
    let user={"username":"johnies","password": "asdfsasdfasdf"}
    let queryresult = {}
    fetch("http://localhost:8081/users/sign-up",
        {"method": "POST",
            "headers":{'Content-Type': 'application/json'},
            "body": JSON.stringify(user)}
    ).then((result) => {
        console.log(result);

    });

}

const signup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {};
    user['username'] = formData.get('username');
    user['password'] = formData.get('password');

    fetch(`${URL}/users/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

const request_index = () => {
    if (localStorage.getItem('bearer') === null) return;
    let token = localStorage.getItem('bearer');
    window.location.href = `${URL}/index.html`
}

let resp = {};
let bearer_token ="";
const login = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {};
    user['username'] = formData.get('username');
    user['password'] = formData.get('password');

    fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((result) => {
        if (result.status === 200){
            bearer_token = result.headers.get('authorization');
            localStorage.setItem('bearer', bearer_token);
            request_index();
        }
        else {
           alert("Ungültige Credentials");
        }
    });

}

document.addEventListener('DOMContentLoaded', function(){
    request_index();
    const signupform = document.querySelector('#signupform');
    signupform.addEventListener('submit', signup);

    const loginform = document.querySelector('#loginform');
    loginform.addEventListener('submit', login);

    //test_fetch();
});
