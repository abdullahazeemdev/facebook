console.log("Facebook Clone Loaded");

document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.querySelector("#login");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const signupBtn = document.querySelector("#create-account");

    // LOGIN
    if (loginBtn) {
        loginBtn.addEventListener("click", function(event) {
            event.preventDefault();

            let email = emailInput.value;
            let password = passwordInput.value;

            if (email === "" || password === "") {
                Swal.fire({
                    title: "Error",
                    text: "Please fill in all fields.",
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: "Success",
                    text: "Login successful!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "./dashboard/index.html";
                });
            }
        });
    }

    // CREATE ACCOUNT
    if (signupBtn) {
        signupBtn.addEventListener("click", function() {
            window.location.href = "./signup/index.html";
        });
        console.log("button clicked");
    }

});