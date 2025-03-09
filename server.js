const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;
const DATA_FILE = "./databases/students.json";

app.use(cors());
app.use(express.json()); // Middleware para recibir JSON

// Obtener lista de estudiantes
app.get("/students", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error leyendo el archivo" });
        }
        res.json(JSON.parse(data));
    });
});

// Agregar un nuevo estudiante
app.post("/students", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error leyendo el archivo" });
        }

        let students = JSON.parse(data);
        students.push(req.body); // Agrega el nuevo estudiante

        fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), "utf8", (err) => {
            if (err) {
                return res.status(500).json({ error: "Error guardando el archivo" });
            }
            res.json({ message: "Estudiante agregado", student: req.body });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});