/* =========================================
   GLOBAL COMPONENT LOADER
========================================= */

const navbar =
document.getElementById("navbar");

const footer =
document.getElementById("footer");

/* =========================================
   PAGE CHECK
========================================= */

const currentPath =
window.location.pathname;

const isCoursePage =
currentPath.includes("/courses/");

/* =========================================
   PATHS
========================================= */

const navbarPath = isCoursePage
? "../components/navbar-course.html?v=2"
: "components/navbar.html?v=2";

const footerPath = isCoursePage
? "../components/footer-course.html?v=2"
: "components/footer.html?v=2";

/* =========================================
   LOAD NAVBAR
========================================= */

if(navbar){

    fetch(navbarPath)

    .then(response => response.text())

    .then(data => {

        navbar.innerHTML = data;

    });

}

/* =========================================
   LOAD FOOTER
========================================= */

if(footer){

    fetch(footerPath)

    .then(response => response.text())

    .then(data => {

        footer.innerHTML = data;

    });

}