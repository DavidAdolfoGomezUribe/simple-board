//dashboard js
console.log("its working")


document.addEventListener("DOMContentLoaded", async function () {
    try {
        let response = await fetch("../databases/dashboarData.json");
        let users = await response.json(); // Guardamos los datos cargados

        console.log(users);

        if (users.length > 0) {
            let studentsCount = users[0].students;
            let courseCount = users[0].course;
            let paymentsCount = users[0].payments;
            let usersCount = users[0].users;

            // Función para renderizar los datos en el maincontainer
            function renderDashboardData() {
                maincontainer.innerHTML = `
                    <section>
                        <article>
                            <div>
                                <img src="../storage/img/graduationCardIcon.svg" alt="">
                                <p>Students</p>
                            </div>
                            <span id="students">${studentsCount}</span>
                        </article>
                        <article>
                            <div>
                                <img src="../storage/img/bookmarkCardIcon.svg" alt="">
                                <p>Course</p>
                            </div>
                            <span id="course">${courseCount}</span>
                        </article>
                        <article>
                            <div>
                                <img src="../storage/img/usd-squareCardIcon.svg" alt="">
                                <p>Payments</p>
                            </div>
                            <span id="payments">${paymentsCount}</span>
                        </article>
                        <article>
                            <div>
                                <img src="../storage/img/UserCardIcon.svg" alt="">
                                <p>Users</p>
                            </div>
                            <span id="users">${usersCount}</span>
                        </article>
                    </section>
                `;
            }

            // Guardamos la referencia de maincontainer y los elementos del menú
            const menuToggle = document.getElementById("menuToggle");
            const sidebar = document.getElementById("sidebar");
            const headercontainer = document.querySelector(".headercontainer");
            const maincontainer = document.querySelector(".maincontainer");
            const listItems = document.querySelectorAll("ul li");

            // Guardamos el contenido original del maincontainer
            renderDashboardData(); // Renderizamos los datos al inicio

            menuToggle.addEventListener("click", function () {
                sidebar.classList.toggle("show");
                menuToggle.classList.toggle("move");
                headercontainer.classList.toggle("expand");
                maincontainer.classList.toggle("mainexpand");
            });

            listItems.forEach(li => {
                li.addEventListener("click", async function () {
                    // Quitar la clase "active" de todos los <li>
                    listItems.forEach(item => item.classList.remove("active"));

                    // Agregar "active" solo al <li> seleccionado
                    this.classList.add("active");

                    // Obtener el valor del atributo data-option
                    const option = this.getAttribute("data-option");

                    if (option === "students") {
                        // Cargar students.html dentro del maincontainer
                        let studentsResponse = await fetch("students.html");
                        let studentsHtml = await studentsResponse.text();
                        maincontainer.innerHTML = studentsHtml;

                        // Agregar CSS específico de students
                        let studentsCSS = document.createElement("link");
                        studentsCSS.rel = "stylesheet";
                        studentsCSS.href = "../css/styleStudents.css";
                        studentsCSS.id = "studentsCSS";
                        document.head.appendChild(studentsCSS);

                        // Agregar JS específico de students
                        let studentsScript = document.createElement("script");
                        studentsScript.src = "../js/students.js";
                        studentsScript.id = "studentsJS";
                        document.body.appendChild(studentsScript);
                    } else if (option === "home") {
                        // Restaurar contenido del Dashboard
                        renderDashboardData();

                        // Eliminar CSS y JS de students
                        document.getElementById("studentsCSS")?.remove();
                        document.getElementById("studentsJS")?.remove();
                    }
                });
            });
        } else {
            console.warn("El JSON está vacío o tiene una estructura incorrecta.");
        }

    } catch (error) {
        console.error("Error al cargar el JSON:", error);
    }
});