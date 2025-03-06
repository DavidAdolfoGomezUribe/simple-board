//dashboard js
console.log("its working")

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const headercontainer = document.querySelector(".headercontainer");
    const maincontainer = document.querySelector(".maincontainer");

    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("show"); // Agrega o quita la clase "show"
        menuToggle.classList.toggle("move"); // Mueve el botón
        headercontainer.classList.toggle("expand")
        maincontainer.classList.toggle("mainexpand")
        
    });
});
