//dashboard js
console.log("its working")

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const headercontainer = document.querySelector(".headercontainer");
    const maincontainer = document.querySelector(".maincontainer");
    const listItems = document.querySelectorAll("ul li");

    // Guardamos el contenido original del maincontainer
    const originalMainContent = maincontainer.innerHTML;

    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("show");
        menuToggle.classList.toggle("move");
        headercontainer.classList.toggle("expand");
        maincontainer.classList.toggle("mainexpand");
    });

    listItems.forEach(li => {
        li.addEventListener("click", function() {
            // Quitar la clase "active" de todos los <li>
            listItems.forEach(item => item.classList.remove("active"));

            // Agregar "active" solo al <li> seleccionado
            this.classList.add("active");

            // Obtener el valor del atributo data-option
            const option = this.getAttribute("data-option");

            if (option === "students") {
                // Si seleccionamos "Students", limpiamos el maincontainer y agregamos un <h1>Hola</h1>
                maincontainer.innerHTML = "<h1>Hola</h1>";
            } else if (option === "home") {
                // Si volvemos a "Home", restauramos el contenido original
                maincontainer.innerHTML = originalMainContent;
            }
        });
    });
});
