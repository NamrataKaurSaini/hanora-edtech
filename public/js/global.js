async function loadComponents() {

    const navbar = document.getElementById("navbar");
    const footer = document.getElementById("footer");

    if(navbar){
        const navResponse = await fetch("components/navbar.html");
        navbar.innerHTML = await navResponse.text();
    }

    if(footer){
        const footerResponse = await fetch("components/footer.html");
        footer.innerHTML = await footerResponse.text();
    }

}

loadComponents();