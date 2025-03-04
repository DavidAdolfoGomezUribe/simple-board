//dashboard js
console.log("its working")

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");

    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("show"); // Agrega o quita la clase "show"
        menuToggle.classList.toggle("move"); // Mueve el botón
        
    });
});
