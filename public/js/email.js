console.log("email.js loaded");

emailjs.init("7IkDYH_-MbgnLD3kG");

/* =========================================
   STATUS MODAL
========================================= */

function showStatus(title, message) {

    const modal =
        document.getElementById("formStatusModal");

    if (!modal) {
        alert(message);
        return;
    }

    document.getElementById("statusTitle").innerText =
        title;

    document.getElementById("statusMessage").innerText =
        message;

    modal.classList.add("active");
}

function hideStatus() {

    const modal =
        document.getElementById("formStatusModal");

    if (modal) {
        modal.classList.remove("active");
    }

}

document.addEventListener("click", function (e) {

    if (
        e.target.id === "statusCloseBtn" ||
        e.target.id === "formStatusModal"
    ) {
        hideStatus();
    }

});

/* =========================================
   FORM SUBMIT HANDLER
========================================= */

document.addEventListener("submit", function (e) {

    const form = e.target;

    /* =====================================
       POPUP FORM
    ===================================== */

    if (form.closest(".popup-right")) {

        e.preventDefault();

        const inputs =
            form.querySelectorAll("input");

        const select =
            form.querySelector("select");

        const templateParams = {

            name:
                inputs[0]?.value || "",

            email:
                inputs[1]?.value || "",

            phone:
                inputs[2]?.value || "",

            experience:
                inputs[3]?.value || "",

            course:
                select?.value || "",

            source:
                "Popup Form",

            message:
                "New admission enquiry received."

        };

        console.log("Popup Data:", templateParams);

        showStatus(
            "Sending Enquiry",
            "Please wait while we submit your request."
        );

        emailjs.send(
            "service_nxpwhh9",
            "template_sawhvi8",
            templateParams
        )
        .then(function (response) {

            console.log("SUCCESS:", response);

            showStatus(
                "Enquiry Submitted",
                "Thank you. Our admissions team will contact you shortly."
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
                "Something went wrong. Please try again."
            );

        });

        return;
    }

    /* =====================================
       CONTACT PAGE FORM
    ===================================== */

    if (form.id === "contactForm") {

        e.preventDefault();

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
            "Sending Message",
            "Please wait while we submit your request."
        );

        emailjs.send(
            "service_nxpwhh9",
            "template_sawhvi8",
            templateParams
        )
        .then(function (response) {

            console.log("SUCCESS:", response);

            showStatus(
                "Message Sent",
                "Thank you. Our team will get back to you soon."
            );

            form.reset();

        })
        .catch(function (error) {

            console.error("EMAILJS ERROR:", error);

            showStatus(
                "Submission Failed",
                "Something went wrong. Please try again."
            );

        });

    }

});