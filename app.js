import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    copyYear: new Date().getFullYear(),
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    copyYear: new Date().getFullYear(),
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    copyYear: new Date().getFullYear(),
  });
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
