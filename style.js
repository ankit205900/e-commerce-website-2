const authWrapper =
    document.getElementById("authWrapper");

const registerTrigger =
    document.getElementById("registerTrigger");

const loginTrigger =
    document.getElementById("loginTrigger");


/* ==========================================
   OPEN REGISTER
========================================== */

registerTrigger.addEventListener("click", function (event) {

    event.preventDefault();

    authWrapper.classList.add("toggled");

});


/* ==========================================
   OPEN LOGIN
========================================== */

loginTrigger.addEventListener("click", function (event) {

    event.preventDefault();

    authWrapper.classList.remove("toggled");

});


/* ==========================================
   LOGIN FORM
========================================== */

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();


    if (username === "" || password === "") {

        alert("Please enter Username and Password.");

        return;

    }


    /* Login Successful */

    alert(
        "Login Successful!\nWelcome " + username
    );


    /* Go to Home Page */

    window.location.href = "home.html";

});


/* ==========================================
   REGISTER FORM
========================================== */

const registerForm =
    document.getElementById("registerForm");


registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("registerUsername").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value.trim();


    if (
        username === "" ||
        email === "" ||
        password === ""
    ) {

        alert("Please fill all fields.");

        return;

    }


    if (password.length < 6) {

        alert(
            "Password must be at least 6 characters."
        );

        return;

    }


    /* Registration Successful */

    alert(
        "Registration Successful!\nWelcome " + username
    );


    /* Go to Home Page */

    window.location.href = "home.html";

});