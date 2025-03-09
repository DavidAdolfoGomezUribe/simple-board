const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Para leer JSON en el body
app.use(cors()); // Para evitar problemas de CORS

// Ruta para obtener estudiantes
app.get("/students", (req, res) => {
    fs.readFile("./databases/students.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo" });
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para agregar un estudiante
app.post("/students", (req, res) => {
    fs.readFile("./databases/students.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo" });
        }

        let students = JSON.parse(data);
        const newStudent = req.body;

        // Añadir la foto por defecto
        newStudent.photo = "../storage/img/students/example.png";

        students.push(newStudent);

        fs.writeFile("./databases/students.json", JSON.stringify(students, null, 2), "utf8", (err) => {
            if (err) {
                return res.status(500).json({ error: "Error al guardar el archivo" });
            }
            res.status(201).json({ message: "Estudiante agregado", student: newStudent });
        });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});