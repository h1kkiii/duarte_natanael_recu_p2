const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Página Principal");
});

app.get("/students", (req, res) => {
    res.send(db);
});

app.get("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = db.find(student => student.id === id);
    if (!student) {
        res.status(404).send("Student not found");
    } else {
        res.send(student);
    }
});

app.post("/students/", (req, res) => {

    const id = new Date().getTime();

    const { fullName, age, course } = req.body;

    const newStudent = db.push({ id: id, fullName: fullName, age: age, course: course });

    res.json({ message: "The student has been added" });
});

app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const { fullName, age, course } = req.body;

    const student = db.find(student => student.id === id);

    if (!student) {
        res.status(404).send("Student not found")
    } 
    student.fullName = fullName;
    student.age = age;
    student.course = course;

    res.json({ message: "The student has been updated" });
});

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const whereStudent = db.find(student => student.id === id);

    const studentInd = db.indexOf(whereStudent);

    const deletedStudent = db.splice(studentInd, 1);

    res.json({ message: "The student has been deleted: ", deletedStudent });
});

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => console.log(`servidor funcionando en puerto ${PORT}`));