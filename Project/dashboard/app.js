// --- 1. Global Variables & Elements ---
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Security Check
if (currentUser === null) {
    window.location.replace("../login.html");
}

// Elements (Saare pehle define kar dein)
const profileBtn = document.getElementById("profileBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownProfile = document.querySelector(".dropdown-profile");
const profileImage = document.getElementById("profileImage");
const imageInput = document.getElementById("imageInput");
const profileName = document.getElementById("dropdownName");
const sliderName = document.getElementById("sidebarName");
const sliderImg = document.getElementById("slidebar-img")
const logout = document.querySelector(".logout")

// --- 2. Initial Data Loading ---
if (currentUser !== null) {
    profileName.innerText = currentUser.firstName + " " + currentUser.lastName;
    sliderName.innerText = currentUser.firstName + " " + currentUser.lastName;
    
    // Initial Profile Image Load
    if (currentUser.profilePic) {
        profileImage.src = currentUser.profilePic;
        const navImage = document.querySelector("#profileBtn img");
        if(navImage) navImage.src = currentUser.profilePic;
    }
    if(sliderImg && currentUser.profilePic){
      sliderImg.src = currentUser.profilePic;
    }
    
}

// --- 3. Dropdown Logic ---
profileBtn.addEventListener("click", function(event) {
    event.preventDefault();
    dropdownMenu.classList.toggle("active");
});

window.addEventListener("click", function(event) {
    if (!profileBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove("active");
    }
});

// log out

logout.addEventListener("click",function(event){
   event.preventDefault();
  //  remove current user
  localStorage.removeItem("currentUser")
  // user back
  window.location.replace("../login.html")
})




// --- 5. Profile Pic Update Logic ---
dropdownProfile.addEventListener("click", function(event) {
    event.stopPropagation();
    imageInput.click();
});

imageInput.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (file) {


        const reader = new FileReader();

       reader.onload = function(e) {
    const newImage = e.target.result;
    currentUser.profilePic = newImage;
    
    // 1. Current Session Update
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
    // 2. Database (Users Array) Update (Sahi variable names ke saath)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    for(let i = 0; i < users.length; i++) {
        if (users[i].email === currentUser.email) {
            users[i].profilePic = newImage;
            localStorage.setItem("users", JSON.stringify(users));
            break; 
        }
    }

          profileImage.src = newImage;
    const navImage = document.querySelector("#profileBtn img");
    if (navImage) navImage.src = newImage;
    if (sliderImg) sliderImg.src = newImage;
    
    dropdownMenu.classList.remove("active");
};

}
});










































































































// // LOGOUT SYSTEM

// const logoutBtn = document.querySelector(".logout");

// if (logoutBtn) {
//   logoutBtn.addEventListener("click", () => {

//     window.location.replace("/login.html");
//   });
// }
// // STORY CLICK SYSTEM


// const storyCards = document.querySelectorAll(".story-card");

// storyCards.forEach((story) => {
//   story.addEventListener("click", () => {
     
//   });
// });


// // POSTS SYSTEM


// const postBtn = document.getElementById("postBtn");
// const postInput = document.getElementById("postInput");
// const postImage = document.getElementById("postImage");
// const postsContainer = document.getElementById("postsContainer");

// let posts = JSON.parse(localStorage.getItem("posts")) || [];

// // RENDER POSTS
// function renderPosts() {

//   postsContainer.innerHTML = "";

//   posts.forEach((post, index) => {

//     const postDiv = document.createElement("div");
//     postDiv.classList.add("post-card");

//     postDiv.innerHTML = `
//       <div class="post-header">
//         <img src="../image/downlaod.jfif">
//         <div>
//           <h4>You</h4>
//           <p>Just now</p>
//         </div>
//       </div>

//       <p class="post-text">${post.text || ""}</p>

//       ${post.image ? `<img class="post-image" src="${post.image}">` : ""}

//       <div class="post-actions">
//         <div onclick="likePost(${index})">👍 Like (${post.likes})</div>
//         <div onclick="deletePost(${index})">🗑 Delete</div>
//       </div>
//     `;

//     postsContainer.prepend(postDiv);
//   });

//   localStorage.setItem("posts", JSON.stringify(posts));
// }

// //////////////////////////////
// // ADD POST (TEXT + IMAGE)
// //////////////////////////////

// if (postBtn) {

//   postBtn.addEventListener("click", () => {

//     const text = postInput.value.trim();
//     const file = postImage.files[0];

//     if (!text && !file) {
//       alert("Please write something or upload image!");
//       return;
//     }

//     if (file) {

//       const reader = new FileReader();

//       reader.onload = function (e) {

//         posts.unshift({
//           text: text,
//           image: e.target.result,
//           likes: 0
//         });

//         renderPosts();
//       };

//       reader.readAsDataURL(file);

//     } else {

//       posts.unshift({
//         text: text,
//         image: "",
//         likes: 0
//       });

//       renderPosts();
//     }

//     postInput.value = "";
//     postImage.value = "";
//   });
// }

// //////////////////////////////
// // LIKE POST
// //////////////////////////////

// window.likePost = function (index) {
//   posts[index].likes++;
//   renderPosts();
// };

// //////////////////////////////
// // DELETE POST
// //////////////////////////////

// window.deletePost = function (index) {
//   posts.splice(index, 1);
//   renderPosts();
// };

// //////////////////////////////
// // INIT LOAD
// //////////////////////////////

// renderPosts();