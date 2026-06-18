
// current user

let currentUser = JSON.parse(
  localStorage.getItem("currentUser")
);

// login check

if (!currentUser) {

  window.location.replace("../login.html");

}


// element

const profileBtn = document.getElementById("profileBtn");

const dropdownMenu = document.getElementById("dropdownMenu");

const dropdownProfile = document.querySelector(".dropdown-profile");

const profileImage = document.getElementById("profileImage");

const imageInput = document.getElementById("imageInput");

const profileName = document.getElementById("dropdownName");

const sliderName = document.getElementById("sidebarName");

const sliderImg = document.getElementById("slidebar-img");

const navProfileImg = document.getElementById("navProfileImg");

const postProfileImg = document.getElementById("postProfileImg");

const logout = document.querySelector(".logout");

// user data 

profileName.innerText =`${currentUser.firstName} ${currentUser.lastName}`;

sliderName.innerText =`${currentUser.firstName} ${currentUser.lastName}`;



// profile image

if (currentUser.profilePic) {

  profileImage.src = currentUser.profilePic;

  sliderImg.src = currentUser.profilePic;

  navProfileImg.src = currentUser.profilePic;

  postProfileImg.src = currentUser.profilePic;


}


// dropdown

profileBtn.addEventListener("click",function(e){

e.preventDefault();

dropdownMenu.classList.toggle("active");

});

window.addEventListener("click",function(e){

if(!profileBtn.contains(e.target) && !dropdownMenu.contains(e.target)){

dropdownMenu.classList.remove(
"active"
);

}

});


// profile pic uplaod

dropdownProfile.addEventListener("click",function(e){

e.stopPropagation();

imageInput.click();

}

);

imageInput.addEventListener("change",function(e){

const file = e.target.files[0];

if(!file){

return;

}

const reader = new FileReader();

reader.onload = function(e){

const image = e.target.result;


// current user update

currentUser.profilePic = image;


// save current user

localStorage.setItem("currentUser",JSON.stringify(currentUser));


// users update

let users =JSON.parse(localStorage.getItem("users")) || [];


for(let i = 0;i < users.length;i++){
    
    if(users[i].email === currentUser.email){

   users[i].profilePic = image;

break;

}

}


// users save

localStorage.setItem("users",JSON.stringify(users));


// show image everywhere

profileImage.src = image;

sliderImg.src = image;

navProfileImg.src = image;

postProfileImg.src = newImage;


// close dropdown

dropdownMenu.classList.remove("active");

};


reader.readAsDataURL(file);

});

// LOGOUT

logout.addEventListener("click",function(e){

e.preventDefault();

localStorage.removeItem("currentUser");

window.location.replace("../login.html");

}

);

// create story

const openStory = document.getElementById("openStory");
const storyInput = document.getElementById("storyInput");
const storiesContainer = document.querySelector(".stories");

// sirf 1 story store hogi
let stories = JSON.parse(localStorage.getItem("stories")) || [];

// Create Story click
openStory.addEventListener("click", function () {
  storyInput.click();
});

// file upload
storyInput.addEventListener("change", function () {

  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {

    const story = {
      type: file.type.startsWith("video") ? "video" : "image",
      url: e.target.result
    };

    // ONLY ONE STORY (replace old one)
    stories = [story];

    localStorage.setItem("stories", JSON.stringify(stories));

    renderStories();
  };

  reader.readAsDataURL(file);
});

// render function
function renderStories() {

  // remove old dynamic stories only
  document.querySelectorAll(".dynamic-story").forEach(el => el.remove());

  if (stories.length > 0) {

    const div = document.createElement("div");
    div.classList.add("story-card", "dynamic-story");

    const story = stories[0];

    if (story.type === "image") {
      div.innerHTML = `<img src="${story.url}">`;
    } else {
      div.innerHTML = `<video src="${story.url}" muted autoplay></video>`;
    }

    // insert after Create Story
    storiesContainer.insertBefore(div, storiesContainer.children[1]);
  }
}

renderStories();