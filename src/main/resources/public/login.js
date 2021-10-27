const URL = 'http://localhost:8081';

const test_fetch = () => {
    let user = { "username": "johnies", "password": "asdfsasdfasdf" }
    let queryresult = {}
    fetch("http://localhost:8081/users/sign-up",
        {
            "method": "POST",
            "headers": { 'Content-Type': 'application/json' },
            "body": JSON.stringify(user)
        }
    ).then((result) => {
        console.log(result);

    });
}

const signup = (e) => {
    console.log(e);
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
let bearer_token = "";
const login = (e) => {
    console.log(e);
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
        if (result.status === 200) {
            bearer_token = result.headers.get('authorization');
            localStorage.setItem('bearer', bearer_token);
            request_index();
        }
        else {
            alert("Ungültige Credentials");
        }
    });

}


const signupLogin = (e) => {
    if (e.submitter.value === 'Login') {
        login(e);
    } else if (e.submitter.value === 'Signup') {
        signup(e);
    }
}



document.addEventListener('DOMContentLoaded', function () {
    request_index();
    //const signupform = document.querySelector('#signupform');
    //signupform.addEventListener('submit', signup);
    const signupLoginForm = document.querySelector('#signupLoginform');
    signupLoginForm.addEventListener('submit', signupLogin)

    //const loginform = document.querySelector('#loginform');
    //loginform.addEventListener('submit', login);

    //test_fetch();
});
