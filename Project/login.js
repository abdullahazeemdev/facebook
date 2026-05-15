// console.log("Facebook Clone Loaded");



    const loginBtn = document.querySelector("#login");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const signupBtn = document.querySelector("#create-account");

    // LOGIN
    loginBtn.addEventListener("click",function(e){
        e.preventDefault();

        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        let users = JSON.parse(localStorage.getItem("users"))|| [];

        let userFound = users.find(user =>
            user.email === email && user.password === password
        );

            if(email === "" || password === ""){
               Swal.fire({
                title: "Error",
                text: "Please fill in all fields.",
                icon: "error"

            });
        } else if (password.length < 8){
            Swal.fire({
            title: "Error",
            text: "Password must be at least 8 characters long",
            icon: "error"
            });
        } if(!email.includes("@")){

             Swal.fire({
            title: "Error",
            text: "Invalid Email",
            icon: "error"
            });

        }else if(userFound){
             Swal.fire({
            title: "Success",
            text: "Login successful!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
            }).then(()=>{
               window.location.href = "../dashboard/index.html"
            })
        }else{
             Swal.fire({
            title: "Error",
            text: "User not found",
            icon: "error"
        });
        }
    });
// CREATE ACCOUNT
    if (signupBtn) {
        signupBtn.addEventListener("click", function() {
            window.location.href = "./signup/index.html";
        });
        console.log("button clicked");
    }

    // EYE icon 

    document.getElementById("eyeIcon").addEventListener("click",function(){
    if(password.type === "password"){
      
      passwordInput.type = "text";
      eyeIcon.classList.replace("fa-eye", "fa-eye-slash")

    }else{
        passwordInput.type = "password";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
    
    })
