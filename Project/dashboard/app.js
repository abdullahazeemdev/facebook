const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");
const logOut = document.getElementById("logOut");

// ================= OPEN / CLOSE MENU =================
if (profileBtn && profileMenu) {
    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        profileMenu.classList.toggle("active");
    });
}

// ================= CLICK OUTSIDE CLOSE =================
document.addEventListener("click", () => {
    if (profileMenu) {
        profileMenu.classList.remove("active");
    }
});

// ================= LOGOUT =================
if (logOut) {
    logOut.addEventListener("click", function () {
        localStorage.removeItem("user");
        window.location.replace("../login.html");
    });
}