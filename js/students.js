async function loadStudents() {
    try {
        let response = await fetch("http://localhost:3000/students");
        let students = await response.json();
        studentListContainer.innerHTML = "";

        students.forEach(student => {
            let studentDiv = document.createElement("div");
            studentDiv.innerHTML = `
                <img src="${student.photo}" alt="Foto de ${student.name}">
                <p>${student.name}</p>
                <p>${student.email}</p>
                <p>${student.phone}</p>
                <p>${student.enrollnumber}</p>
                <p>${student.date}</p>
                <img src="../storage/img/edit.png" alt="Edit">
                <img src="../storage/img/delete.png" alt="Delete">
            `;
            studentListContainer.appendChild(studentDiv);
        });
    } catch (error) {
        console.error("Error al cargar los estudiantes:", error);
    }
}

async function addStudent(newStudent) {
    try {
        let response = await fetch("http://localhost:3000/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStudent)
        });

        let result = await response.json();
        console.log(result);
        loadStudents(); // Recargar lista de estudiantes
    } catch (error) {
        console.error("Error al agregar estudiante:", error);
    }
}