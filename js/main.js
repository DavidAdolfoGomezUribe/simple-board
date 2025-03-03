console.log("furula")

document.addEventListener("DOMContentLoaded", async function() {
    try {
        // 1️⃣ Cargar datos desde el JSON
        let response = await fetch("databases/usersLogin.json");
        let users = await response.json(); // Guardamos los usuarios cargados
        
        

        console.log(response);
        console.log("Usuarios cargados desde JSON:", users); // Verificar en consola


        // 2️⃣ Seleccionar el formulario
        const form = document.querySelector("#formconatiner");

        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Evita el envío por defecto

            // 3️⃣ Obtener valores del formulario
            const email = form.email.value.trim();
            const password = form.password.value.trim();

            // 4️⃣ Validar credenciales con los datos del JSON
            const userFound = users.find(function(user) {
                return user.email === email && user.password === password;
            }); //regresa undefined si no coincide , retorna un array {clave:valor} si coincide

            console.log(userFound);

            if (userFound) {
                alert("Inicio de sesión exitoso ✅");
                window.location.href = "views/main.html"; // Redirige al portal
            } else {
                alert("Correo o contraseña incorrectos ❌");
            }
        });

    } catch (error) {
        console.error("Error al cargar el JSON:", error);
    }
});