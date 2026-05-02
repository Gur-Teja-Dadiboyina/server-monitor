const express = require("express");
const db = require("./db");
require("dotenv").config();

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json()); // IMPORTANT for real metrics API

/* ===================== HOME - LIST SERVERS ===================== */
app.get("/", (req, res) => {
  db.query("SELECT * FROM servers", (err, servers) => {
    if (err) throw err;
    res.render("index", { servers });
  });
});

/* ===================== ADD SERVER PAGE ===================== */
app.get("/add-server", (req, res) => {
  res.render("add-server");
});

/* ===================== ADD SERVER (POST) ===================== */
app.post("/add-server", (req, res) => {
  const { name, ip } = req.body;

  db.query(
    "INSERT INTO servers (name, ip_address) VALUES (?, ?)",
    [name, ip],
    (err) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

/* ===================== SERVER DETAILS + METRICS ===================== */
app.get("/server/:id", (req, res) => {
  const serverId = req.params.id;

  db.query(
    "SELECT * FROM servers WHERE id = ?",
    [serverId],
    (err, server) => {
      if (err) throw err;

      db.query(
        "SELECT * FROM metrics WHERE server_id = ? ORDER BY created_at DESC LIMIT 10",
        [serverId],
        (err, metrics) => {
          if (err) throw err;

          res.render("server-details", {
            server: server[0],
            metrics,
          });
        }
      );
    }
  );
});

/* ===================== REAL METRICS API ===================== */
/*
  This is where your agent will send data
  Example:
  POST /api/metrics
  {
    server_id: 1,
    cpu_usage: 45.2,
    memory_usage: 60.5
  }
*/
app.post("/api/metrics", (req, res) => {
  const { server_id, cpu_usage, memory_usage } = req.body;

  if (!server_id || cpu_usage === undefined || memory_usage === undefined) {
    return res.status(400).send("Invalid metrics data");
  }

  db.query(
    "INSERT INTO metrics (server_id, cpu_usage, memory_usage) VALUES (?, ?, ?)",
    [server_id, cpu_usage, memory_usage],
    (err) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).send("Database error");
      }

      res.send("Metric stored successfully");
    }
  );
});

/* ===================== START SERVER ===================== */
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});