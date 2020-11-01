const path = require("path");
const express = require("express");
const hbs = require("hbs");

const PORT = 3000;
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/partials/");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));



app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about")
})

app.get("/help", (req, res) => {
  res.render("help")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/workOrders", (req, res) => {
  res.render("workOrders")
})

app.get("/getworkOrders", (req, res) => {
  res.send([
    {
      device: "iPhone 8",
      diagnosis: "Cracked screen.",
      parts: [
        "iPhone 8 Screen"
      ],
      technician: "Nathan"
    },
    {
      device: "OnePlus 8 Pro",
      diagnosis: "Battery replacement.",
      parts: [
        "OnePlus 8 Pro Battery"
      ],
      technician: "Terry"
    }
  ]);
});

app.get("*", (req, res) => {
  res.render("fourohfour");
});

app.post("*", (req, res) => {
  res.render("fourohfour");
});

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);