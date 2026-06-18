/* ================= INITIALIZATION ================= */
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users")) || [];

if (!currentUser) {
  window.location.replace("../login.html");
}

/* ================= CORE HELPERS ================= */
function saveUser() {
  const i = users.findIndex(u => u.email === currentUser.email);
  if (i !== -1) {
    users[i] = currentUser;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
}

function updateUI() {
  const img = currentUser.profilePic || "/images/download.jfif";
  
  // Set Profile Names
  document.getElementById("dropdownName").innerText = `${currentUser.firstName} ${currentUser.lastName}`;
  document.getElementById("sidebarName").innerText = `${currentUser.firstName} ${currentUser.lastName}`;

  // Set Profile Images
  const images = ["navProfileImg", "slidebar-img", "postProfileImg", "profileImage"];
  images.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.src = img;
  });
}

/* ================= STORY LOGIC ================= */
const openStory = document.getElementById("openStory");
const storyInput = document.getElementById("storyInput");

if (openStory) {
  openStory.onclick = () => storyInput.click();
  storyInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      currentUser.story = { type: file.type.startsWith("video") ? "video" : "image", url: e.target.result };
      saveUser();
      renderStory();
    };
    reader.readAsDataURL(file);
  });
}

function renderStory() {
  const storyList = document.getElementById("storyList");
  if (!storyList || !currentUser.story) return;
  storyList.innerHTML = `
    <div class="story-card dynamic-story">
      ${currentUser.story.type === "image" 
        ? `<img src="${currentUser.story.url}">` 
        : `<video src="${currentUser.story.url}" muted autoplay></video>`}
    </div>`;
}

/* ================= POST LOGIC ================= */
const postBtn = document.getElementById("postBtn");
const postInput = document.getElementById("postInput");
const postImage = document.getElementById("postImage");

postBtn.onclick = () => {
  const text = postInput.value.trim();
  const file = postImage.files[0];
  if (!text && !file) return alert("Kuch likhein ya image select karein!");

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => createPost(text, e.target.result);
    reader.readAsDataURL(file);
  } else {
    createPost(text, null);
  }
};

function createPost(text, imgUrl) {
  if (!currentUser.posts) currentUser.posts = [];
  currentUser.posts.unshift({ text, image: imgUrl, likes: 0, comments: [] });
  saveUser();
  renderPosts();
  postInput.value = "";
  postImage.value = "";
}

function renderPosts() {
  const container = document.getElementById("postsContainer");
  if (!container) return;
  container.innerHTML = "";
  (currentUser.posts || []).forEach((post, index) => {
    container.innerHTML += `
      <div class="post-card">
        <div class="post-header">
          <img src="${currentUser.profilePic || '/images/download.jfif'}">
          <b>${currentUser.firstName} ${currentUser.lastName}</b>
        </div>
        <p>${post.text}</p>
        ${post.image ? `<img class="post-image" src="${post.image}">` : ""}
        <div class="post-actions">
          <button onclick="likePost(${index})">👍 ${post.likes}</button>
          <button onclick="commentPost(${index})">💬 Comment</button>
          <button onclick="editPost(${index})">✏️ Edit</button>
          <button onclick="deletePost(${index})">🗑 Delete</button>
        </div>
      </div>`;
  });
}

/* ================= ACTIONS & THEME ================= */
window.likePost = (i) => { currentUser.posts[i].likes++; saveUser(); renderPosts(); };
window.editPost = (i) => { 
    const newText = prompt("Edit post:", currentUser.posts[i].text); 
    if (newText !== null) { currentUser.posts[i].text = newText; saveUser(); renderPosts(); } 
};
window.deletePost = (i) => { currentUser.posts.splice(i, 1); saveUser(); renderPosts(); };

// Dark Mode
document.getElementById("darkToggle")?.addEventListener("click", () => {
  currentUser.darkMode = !currentUser.darkMode;
  saveUser();
  document.body.classList.toggle("dark", currentUser.darkMode);
});

// Dropdown
const profileBtn = document.getElementById("profileBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
profileBtn?.addEventListener("click", (e) => { e.stopPropagation(); dropdownMenu.classList.toggle("active"); });
window.addEventListener("click", () => dropdownMenu?.classList.remove("active"));

// INIT
updateUI();
document.body.classList.toggle("dark", currentUser.darkMode || false);
renderStory();
renderPosts();

/* Add this inside the "ACTIONS & THEME" section */
// Logout logic
const logoutBtn = document.querySelector(".logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // 1. Remove current user from local storage
    localStorage.removeItem("currentUser");
    
    // 2. Redirect to login page
    window.location.replace("../login.html");
  });
}

/* ================= PROFILE PICTURE UPLOAD LOGIC ================= */
const imageInput = document.getElementById("imageInput");
const profileImage = document.getElementById("profileImage");

// Jab dropdown mein profile picture par click ho
profileImage.onclick = () => imageInput.click();

// Jab file select ho jaye
imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    // 1. Current user object mein new URL save karein
    currentUser.profilePic = e.target.result;
    
    // 2. Local Storage update karein
    saveUser();
    
    // 3. UI update karein (taaki har jagah change ho jaye)
    updateUI();
  };
  reader.readAsDataURL(file);
});
function updateUI() {
  // Agar profilePic exist karti hai toh woh lein, warna default
  const img = currentUser.profilePic || "/images/download.jfif";
  
  // Set Profile Names
  const dropName = document.getElementById("dropdownName");
  const sideName = document.getElementById("sidebarName");
  if(dropName) dropName.innerText = `${currentUser.firstName} ${currentUser.lastName}`;
  if(sideName) sideName.innerText = `${currentUser.firstName} ${currentUser.lastName}`;

  // Har us jagah update karein jahan profile image hai
  const images = ["navProfileImg", "slidebar-img", "postProfileImg", "profileImage"];
  images.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.src = img;
  });
}

if (postBtn) {
  postBtn.onclick = () => {
    const text = postInput.value.trim();
    const file = postImage.files[0];

    if (!text && !file) {
      return alert("Kuch likhein ya image select karein!");
    }

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        createPost(text, e.target.result);
      };

      reader.readAsDataURL(file);

    } else {
      createPost(text, null);
    }
  };
}