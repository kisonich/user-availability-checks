const usersTable = require("./src/windows");
const path = require("path");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Веб-приложение",
  });
});

app.post("/users", async (req, res) => {
  const name = req.body.name;
  try {
    const users = await usersTable();
    const value = users.includes(name) ? 0 : -1;
    const message = value === -1 ? `Пользователя ${name} не существует` : `Пользователь ${name} найден`;

    res.render("users", {
      title: message,
      name,
      value,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ошибка сервера");
  }
});

const server = app.listen(port, () => {
  console.log(`Приложение запущено на http://localhost:${port}`);
});
