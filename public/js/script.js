window.onload = init;
function init() {
    const togglePassword = document.getElementById("togglePassword");
    const password = document.getElementById("password");

    const terms = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');
    
    // PASSWORD VISIBILITY
    togglePassword.addEventListener("click", function () {

        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);

        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // TERMS CHECKBOX
    terms.addEventListener('change', () => {
        submitBtn.classList.toggle('disabled', !terms.checked);
    });
}