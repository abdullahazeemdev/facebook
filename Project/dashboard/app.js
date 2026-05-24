//////////////////////////////
// PROFILE DROPDOWN
//////////////////////////////

const profileBtn = document.getElementById("profileBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

if (profileBtn && dropdownMenu) {

  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  window.addEventListener("click", () => {
    dropdownMenu.classList.remove("active");
  });

  dropdownMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

//////////////////////////////
// LOGOUT SYSTEM
//////////////////////////////

const logoutBtn = document.querySelector(".logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();

    window.location.replace("/login.html");
  });
}

//////////////////////////////
// STORY CLICK SYSTEM
//////////////////////////////

const storyCards = document.querySelectorAll(".story-card");

storyCards.forEach((story) => {
  story.addEventListener("click", () => {
     
  });
});

//////////////////////////////
// POSTS SYSTEM
//////////////////////////////

const postBtn = document.getElementById("postBtn");
const postInput = document.getElementById("postInput");
const postImage = document.getElementById("postImage");
const postsContainer = document.getElementById("postsContainer");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

// RENDER POSTS
function renderPosts() {

  postsContainer.innerHTML = "";

  posts.forEach((post, index) => {

    const postDiv = document.createElement("div");
    postDiv.classList.add("post-card");

    postDiv.innerHTML = `
      <div class="post-header">
        <img src="https://i.pravatar.cc/150?img=12">
        <div>
          <h4>You</h4>
          <p>Just now</p>
        </div>
      </div>

      <p class="post-text">${post.text || ""}</p>

      ${post.image ? `<img class="post-image" src="${post.image}">` : ""}

      <div class="post-actions">
        <div onclick="likePost(${index})">👍 Like (${post.likes})</div>
        <div onclick="deletePost(${index})">🗑 Delete</div>
      </div>
    `;

    postsContainer.prepend(postDiv);
  });

  localStorage.setItem("posts", JSON.stringify(posts));
}

//////////////////////////////
// ADD POST (TEXT + IMAGE)
//////////////////////////////

if (postBtn) {

  postBtn.addEventListener("click", () => {

    const text = postInput.value.trim();
    const file = postImage.files[0];

    if (!text && !file) {
      alert("Please write something or upload image!");
      return;
    }

    if (file) {

      const reader = new FileReader();

      reader.onload = function (e) {

        posts.unshift({
          text: text,
          image: e.target.result,
          likes: 0
        });

        renderPosts();
      };

      reader.readAsDataURL(file);

    } else {

      posts.unshift({
        text: text,
        image: "",
        likes: 0
      });

      renderPosts();
    }

    postInput.value = "";
    postImage.value = "";
  });
}

//////////////////////////////
// LIKE POST
//////////////////////////////

window.likePost = function (index) {
  posts[index].likes++;
  renderPosts();
};

//////////////////////////////
// DELETE POST
//////////////////////////////

window.deletePost = function (index) {
  posts.splice(index, 1);
  renderPosts();
};

//////////////////////////////
// INIT LOAD
//////////////////////////////

renderPosts();