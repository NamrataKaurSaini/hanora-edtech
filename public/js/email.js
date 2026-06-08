console.log("email.js loaded");

emailjs.init("20-ABcVUgqa4V5_NL");

document.addEventListener("submit", function (e) {

    const form = e.target;

    // Only handle popup form
    if (!form.closest(".popup-right")) return;

    e.preventDefault();

    console.log("FORM DETECTED");

    const inputs = form.querySelectorAll("input");
    const select = form.querySelector("select");

    const templateParams = {
        name: inputs[0]?.value || "",
        email: inputs[1]?.value || "",
        phone: inputs[2]?.value || "",
        experience: inputs[3]?.value || "",
        course: select?.value || "",
        source: "Popup Form",
        message: "New admission enquiry received."
    };

    console.log("Sending Data:", templateParams);

    emailjs.send(
        "service_c8m4gsv",
        "template_jtvb9q1",
        templateParams
    )
    .then(function(response) {

        console.log("SUCCESS:", response);

        alert("Thank you! Your enquiry has been submitted successfully.");

        form.reset();

        const popupOverlay =
            document.getElementById("popupOverlay");

        if (popupOverlay) {
            popupOverlay.classList.remove("active");
        }

    })
    .catch(function(error) {

        console.error("EMAILJS ERROR:", error);

        alert("Failed to send enquiry.");

    });

});