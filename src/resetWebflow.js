export function reenableWebflowForms() {


    function handleFormSubmission(form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            const email = formData.get("Email"); // Get the email field
            const honeypot = formData.get("Bot-prevent"); // Unified honeypot name

            // Strict honeypot check - stop if filled
            if (honeypot && honeypot.length > 0) {
                console.log("🤖 Bot submission detected and blocked for form:", form);
                return; // Exit function, no submission
            }

            if (!email) {
                console.error("🚨 Email field is missing in form:", form);
                return; // Exit if email is missing
            }

            // Find success and error messages
            const successMessage = form.closest(".c-form-wrapper")?.querySelector(".sucess-message");
            const errorMessage = form.closest(".c-form-wrapper")?.querySelector(".w-form-fail");

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {

                    // Hide form & show success message
                    form.style.display = "none";
                    if (successMessage) successMessage.style.display = "flex";
                    if (errorMessage) errorMessage.style.display = "none"; // Hide error just in case
                } else {

                    // Show error message
                    if (errorMessage) errorMessage.style.display = "block";
                }
            } catch (error) {
                console.error("⚠️ Error submitting form:", error, form);
                // Show error message
                if (errorMessage) errorMessage.style.display = "block";
            }
        });
    }

    function resetForms() {
        // Target all Webflow forms with a page ID attribute
        const forms = document.querySelectorAll("form[data-wf-page-id]");
        if (forms.length === 0) {

            return;
        }

        forms.forEach((form) => {
            // Check for the unified Bot-prevent field
            const hasHoneypot = form.querySelector("input[name='Bot-prevent']");
            if (!hasHoneypot) {

                return; // Skip forms without our honeypot
            }

            // 🛑 Step 1: Detach ALL event handlers (Webflow’s and others)
            const formClone = form.cloneNode(false); // Clone without children to strip events
            formClone.innerHTML = form.innerHTML; // Reattach content
            $(form).off(); // Remove jQuery-bound listeners
            form.removeEventListener("submit", form.onsubmit); // Remove native listeners
            form.parentNode.replaceChild(formClone, form); // Replace original form

            // ✅ Step 2: Reattach our custom form handling logic
            handleFormSubmission(formClone);

        });

        // 🔄 Step 3: Reinitialize Webflow safely
        setTimeout(() => {
            if (window.Webflow) {
                if (typeof window.Webflow.destroy === "function") {
                    window.Webflow.destroy();
                }
                if (typeof window.Webflow.ready === "function") {
                    window.Webflow.ready();
                }
                if (typeof window.Webflow.require === "function") {
                    try {
                        const ix2 = window.Webflow.require("ix2");
                        if (ix2 && typeof ix2.init === "function") {
                            ix2.init();
                        }
                    } catch (error) {
                        console.warn("⚠️ Webflow IX2 is not available or failed to initialize:", error);
                    }
                }
            }

        }, 10); // Small delay for DOM updates
    }

    // Run resetForms immediately when reenableWebflowForms is called
    resetForms();
}