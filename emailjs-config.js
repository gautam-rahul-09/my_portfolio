// ==============================
// EmailJS Configuration
// ==============================

const EMAILJS_CONFIG = {
    PUBLIC_KEY: "mSNkhi4iVm1QGey2U",
    SERVICE_ID: "service_2f7lysf",
    TEMPLATE_ID: "template_pm9vr2r"
};


// ==============================
// Initialize EmailJS
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    // Check EmailJS loaded
    if (typeof emailjs === "undefined") {
        console.error("EmailJS library not loaded");

        alert(
            "Email service failed to load. Check script import."
        );

        return;
    }

    // Initialize
    emailjs.init(
        EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.log("EmailJS initialized");

    const contactForm =
        document.getElementById("contactForm");

    if (!contactForm) {
        console.error(
            "Contact form not found"
        );
        return;
    }

    // ==============================
    // Form Submit
    // ==============================

    contactForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const submitBtn =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            const originalText =
                submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML =
                "Sending...";

            // Collect form values

            const templateParams = {

                from_name:
                    document.getElementById(
                        "name"
                    ).value.trim(),

                from_email:
                    document.getElementById(
                        "email"
                    ).value.trim(),

                subject:
                    document.getElementById(
                        "subject"
                    ).value.trim(),

                message:
                    document.getElementById(
                        "message"
                    ).value.trim(),

                reply_to:
                    document.getElementById(
                        "email"
                    ).value.trim()
            };

            console.log(
                "Sending Data:",
                templateParams
            );

            try {

                const response =
                    await emailjs.send(
                        EMAILJS_CONFIG.SERVICE_ID,
                        EMAILJS_CONFIG.TEMPLATE_ID,
                        templateParams
                    );

                console.log(
                    "SUCCESS:",
                    response
                );

                alert(
                    "✅ Message sent successfully!"
                );

                contactForm.reset();

            } catch (error) {

                console.error(
                    "FULL ERROR:",
                    error
                );

                alert(
                    `❌ Error:\n${
                        error.text ||
                        error.message ||
                        JSON.stringify(error)
                    }`
                );

            } finally {

                submitBtn.disabled = false;

                submitBtn.innerHTML =
                    originalText;
            }

        }
    );

});