/* =========================================
   COMPONENT TARGETS
========================================= */

const navbar = document.getElementById("navbar");
const footer = document.getElementById("footer");
const popup = document.getElementById("popup");

/* =========================================
   PAGE CHECK
========================================= */

const isCoursePage =
    window.location.pathname.includes("/courses/");

/* =========================================
   ROOT PATH
========================================= */

const ROOT = isCoursePage ? "../" : "";

/* =========================================
   LOAD COMPONENT
========================================= */

function loadComponent(element, path) {

    if (!element) return;

    fetch(path)
        .then(res => res.text())
        .then(data => {

            data = data.replaceAll("{{ROOT}}", ROOT);

            element.innerHTML = data;

        })
        .catch(err => {
            console.log("Component load error:", err);
        });

}

/* =========================================
   LOAD COMPONENTS
========================================= */

loadComponent(popup, `${ROOT}components/popup.html`);
loadComponent(navbar, `${ROOT}components/navbar.html`);
loadComponent(footer, `${ROOT}components/footer.html`);

/* =========================================
   GLOBAL POPUP EVENTS
========================================= */

document.addEventListener("click", (e) => {

    const popupOverlay =
        document.getElementById("popupOverlay");

    if (!popupOverlay) return;

    if (e.target.closest("#openPopupBtn")) {
        popupOverlay.classList.add("active");
    }

    if (e.target.closest("#popupClose")) {
        popupOverlay.classList.remove("active");
    }

    if (e.target === popupOverlay) {
        popupOverlay.classList.remove("active");
    }

});

/* =========================================
   MOBILE MENU
========================================= */

document.addEventListener("click", (e) => {

    const menuBtn = e.target.closest("#menuToggle");
    const navRight = document.querySelector(".nav-right");
    const dropdown = e.target.closest(".dropdown-link");

    if (menuBtn && navRight) {
        navRight.classList.toggle("active");
    }

    if (dropdown && window.innerWidth <= 992) {
        e.preventDefault();
        dropdown.parentElement.classList.toggle("active");
    }

});