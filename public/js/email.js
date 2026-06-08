console.log("email.js loaded");

emailjs.init("20-ABcVUgqa4V5_NL");

function showStatus(title, message) {

    document.getElementById("statusTitle").innerText =
        title;

    document.getElementById("statusMessage").innerText =
        message;

    document.getElementById("formStatusModal")
        .classList.add("active");
}

function hideStatus() {

    document
        .getElementById("formStatusModal")
        ?.classList.remove("active");
}

document.addEventListener("click", function (e) {

    if (
        e.target.id === "statusCloseBtn" ||
        e.target.id === "formStatusModal"
    ) {
        hideStatus();
    }

});

document.addEventListener("submit", function (e) {

    e.preventDefault();

    const form = e.target;

    // =====================================
    // POPUP FORM
    // =====================================

    if (form.closest(".popup-right")) {

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

        console.log("Popup Data:", templateParams);

        showStatus(
            "Sending Enquiry",
            "Please wait while we submit your request.",
            "⏳"
        );

        emailjs.send(
            "service_c8m4gsv",
            "template_jtvb9q1",
            templateParams
        )
            .then(function () {

                showStatus(
                    "Enquiry Submitted",
                    "Thank you. Our admissions team will contact you shortly.",
                    
                );

                form.reset();

                const popupOverlay =
                    document.getElementById("popupOverlay");

                if (popupOverlay) {
                    popupOverlay.classList.remove("active");
                }

            })
            .catch(function (error) {

                console.error("EMAILJS ERROR:", error);

                showStatus(
                    "Submission Failed",
                    "Something went wrong. Please try again.",
                    
                );

            });

        return;
    }

    // =====================================
    // CONTACT FORM
    // =====================================

    if (form.id === "contactForm") {

        const templateParams = {

            name:
                document.getElementById("contactName")?.value || "",

            email:
                document.getElementById("contactEmail")?.value || "",

            phone:
                document.getElementById("contactPhone")?.value || "",

            course:
                document.getElementById("contactCourse")?.value || "",

            experience:
                "N/A",

            source:
                "Contact Page",

            message:
                document.getElementById("contactMessage")?.value || ""

        };

        console.log("Contact Data:", templateParams);

        showStatus(
            "Sending Enquiry",
            "Please wait while we submit your request.",
            
        );

        emailjs.send(
            "service_c8m4gsv",
            "template_jtvb9q1",
            templateParams
        )
            .then(function () {

                showStatus(
                    "Message Sent",
                    "Thank you. Our team will get back to you soon.",
                    
                );

                form.reset();

            })
            .catch(function (error) {

                console.error("EMAILJS ERROR:", error);

                showStatus(
                    "Submission Failed",
                    "Something went wrong. Please try again.",
                    
                );

            });

    }

});