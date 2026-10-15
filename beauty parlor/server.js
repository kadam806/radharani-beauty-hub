require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection (PUT YOUR PASSWORD HERE)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
});

// ✅ Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("Database Error ❌:", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});


// ==============================
// ✅ POST API → Save Appointment
// ==============================
app.post("/book", (req, res) => {
    const { name, email, phone, date, time, service, message } = req.body;

    const sql = `
        INSERT INTO appointments 
        (name, email, phone, date, time, service, message)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, email, phone, date, time, service, message], (err, result) => {
        if (err) {
            console.log("Insert Error:", err);
            return res.status(500).send("Error saving data ❌");
        }

        res.send("Appointment Booked Successfully ✅");
    });
});


// ==============================
// ✅ GET API → View All Data
// ==============================
app.get("/appointments", (req, res) => {
    const sql = "SELECT * FROM appointments ORDER BY id DESC";

    db.query(sql, (err, result) => {
        if (err) {
            console.log("Fetch Error:", err);
            return res.status(500).send("Error fetching data ❌");
        }

        res.json(result);
    });
});


// ==============================
// ✅ DELETE API (Optional)
// ==============================
app.delete("/appointments/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM appointments WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log("Delete Error:", err);
            return res.status(500).send("Error deleting data ❌");
        }

        res.send("Appointment Deleted ✅");
    });
});



app.put("/appointments/:id", (req, res) => {
    const id = req.params.id;
    const { name, email, phone, date, time, service, message } = req.body;

    const sql = `
        UPDATE appointments 
        SET name=?, email=?, phone=?, date=?, time=?, service=?, message=? 
        WHERE id=?
    `;

    db.query(sql, [name, email, phone, date, time, service, message, id], (err, result) => {
        if (err) {
            console.log("Update Error:", err);
            return res.status(500).send("Error updating data ❌");
        }

        res.send("Appointment Updated ✅");
    });
});


// ==============================
// ✅ START SERVER
// ==============================
app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
});