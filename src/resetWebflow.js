export function reenableWebflowForms() {
    console.log("🔄 Re-enabling Webflow Forms...");

    function handleFormSubmission(form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission
            
            const formData = new FormData(form);
            const email = formData.get("Email"); // Get the email field
    
            if (!email) {
                console.error("🚨 Email field is missing!");
                return;
            }
    
            // Find success and error messages
            const successMessage = form.closest(".c-form-wrapper").querySelector(".sucess-message");
            const errorMessage = form.closest(".c-form-wrapper").querySelector(".w-form-fail");
    
            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                });
    
                if (response.ok) {
                    console.log("✅ Form submitted successfully!");
    
                    // Hide form & show success message
                    form.style.display = "none";
                    if (successMessage) successMessage.style.display = "flex";
                    if (errorMessage) errorMessage.style.display = "none"; // Hide error just in case
                } else {
                    console.error("❌ Submission failed!");
    
                    // Show error message
                    if (errorMessage) errorMessage.style.display = "block";
                }
            } catch (error) {
                console.error("⚠️ Error submitting form:", error);
    
                // Show error message
                if (errorMessage) errorMessage.style.display = "block";
            }
        });
    }

    function resetForms() {
        const forms = document.querySelectorAll("form[name='email-form']");
        if (forms.length === 0) {
            console.warn("🚨 No contact forms found on this page.");
            return;
        }
    
        forms.forEach((form) => {
            // 🛑 Step 1: Detach Webflow’s old event handlers
            $(form).off(); // Removes all event listeners attached to the form
    
            // 🔄 Step 2: Clone the form (removes old event listeners)
            const newForm = form.cloneNode(true);
            form.replaceWith(newForm);
    
            // ✅ Step 3: Reattach our custom form handling logic
            handleFormSubmission(newForm);
        });
    
        // 🔄 Step 4: Ensure Webflow reinitialization works safely
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
                        console.warn("⚠️ Webflow IX2 is not available or failed to initialize.");
                    }
                }
            }
        }, 10); // Small delay to ensure DOM updates
    
        console.log("✅ Webflow reinitialized successfully.");
    }

    // 🔥 Run on page load
    resetForms();

    // 🔄 Run after Barba.js transitions
    document.addEventListener("barba:after", () => {
        console.log("🎭 Barba.js transition complete. Reinitializing forms...");
        resetForms();
    });
}