const footerLinks = document.querySelectorAll(".px-3");
const email = footerLinks[3];
email.addEventListener("click", e => {
    e.preventDefault();
    alert("My email is " + email.getAttribute("href") );
});