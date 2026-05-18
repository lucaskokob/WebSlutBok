const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();
const PORT = 3000;
app.use(express.json());

const db = new sqlite3.Database("./books.db");

db.run(
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, borrowed BOOLEAN DEFAULT FALSE)"
);

app.get("/books", (req, res) => {
  db.all("SELECT * FROM books", (err, rows) => {
    if (rows.length === 0) {
      res.status(204).json({ message: "No books found" });
      return;
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
