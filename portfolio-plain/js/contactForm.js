
function showAlert(box, type, text) {
  box.className = `alert alert-${type}-custom`;
  box.textContent = text;
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const box = document.getElementById("form-alert");
  const button = document.getElementById("submit-btn");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    box.className = "alert d-none";

    form.classList.add("was-validated");
    if (!form.checkValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    const name = data.name.trim();
    const email = data.email.trim();
    const subject = data.subject.trim();
    const message = data.message.trim();

    // Option B: send through Formspree (or any compatible endpoint)
    if (FORM_ENDPOINT) {
      button.disabled = true;
      button.textContent = "Sending...";
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        });
        if (!res.ok) throw new Error("Request failed");
        form.reset();
        form.classList.remove("was-validated");
        showAlert(box, "success", "Thank you! Your message was sent. I will reply soon.");
      } catch {
        showAlert(box, "danger", "Sorry, the message could not be sent. Please email me directly.");
      } finally {
        button.disabled = false;
        button.textContent = "Send Message";
      }
      return;
    }

    // Option A: open the visitor's email app with everything filled in
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    showAlert(box, "success", "Your email app should open with the message ready to send.");
    form.reset();
    form.classList.remove("was-validated");
  });
}
