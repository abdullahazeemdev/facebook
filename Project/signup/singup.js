// console.log("conected")

let submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", function(e) {
  e.preventDefault();

let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let gender = document.getElementById("gender");
let date = document.getElementById("date");
let month = document.getElementById("month");
let year = document.getElementById("year");
let email = document.getElementById("email");
let password = document.getElementById("password");
let eyeIcon = document.getElementById("eyeIcon")




let dob = `${date.value},${month.value},${year.value}`;

// logics

if(firstName.value.trim() == ""){
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "First name required"
})
} else if(lastName.value.trim() == ""){
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Last name required"
});

} else if (date.value == "" ||month.value == "" ||year.value == "") {
  Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Date of birth required"
});
} else if(gender.value == ""){
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Gender required"
});
} else if(email.value.trim() == ""){
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Email required"
});
}else if(!email.value.includes("@")){

      Swal.fire({
      title: "Error",
      text: "Invalid Email",
      icon: "error"
});

} else if(password.value.length < 8){
      Swal.fire({
      icon: "error",
      title: "",
      text: "Password must be at least 8 characters long"
});
}else {

  let userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    dateOfBirth: dob,
    gender: gender.value,
    email: email.value,
    password: password.value
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push(userData);

  localStorage.setItem("users", JSON.stringify(users));

  Swal.fire({
    icon: "success",
    title: "Congratulations",
    text: "Your account has been created successfully"
  });

  setTimeout(() => {
    window.location.replace("../login.html");
  }, 2000);

}
});


// let eyeIcon = document.getElementById("eyeIcon");
// let password = document.getElementById("password");

eyeIcon.addEventListener("click", function () {

  if (password.type === "password") {
    password.type = "text";
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    password.type = "password";
    eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
  }

});



document.getElementById("back").addEventListener("click",function(){
  window.location.replace("../login.html");
});



