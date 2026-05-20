console.log("Facebook Clone Loaded");

const loginBtn = document.querySelector("#login");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const signupBtn = document.querySelector("#create-account");
const eyeIcon = document.getElementById("eyeIcon");

// ================= LOGIN =================
if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
        e.preventDefault();

        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let userFound = users.find(user =>
            user.email === email && user.password === password
        );

        // VALIDATION
        if (email === "" || password === "") {
            Swal.fire("Error", "Please fill in all fields.", "error");

        } else if (!email.includes("@")) {
            Swal.fire("Error", "Invalid Email", "error");

        } else if (password.length < 8) {
            Swal.fire("Error", "Password must be at least 8 characters long", "error");

        } else if (userFound) {

            // SAVE SESSION USER
            localStorage.setItem("user", JSON.stringify(userFound));

            Swal.fire({
                title: "Success",
                text: "Login successful!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.replace("../dashboard/index.html");
            });

        } else {
            Swal.fire("Error", "User not found", "error");
        }
    });
}

// ================= SIGNUP BUTTON =================
if (signupBtn) {
    signupBtn.addEventListener("click", function () {
        window.location.replace("./signup/index.html");
    });
}

// ================= EYE ICON TOGGLE =================
if (eyeIcon) {
    eyeIcon.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            passwordInput.type = "password";
            eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
}