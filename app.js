import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let editorContent = [];
let titleBody = [];
let contentBody = "";

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    copyYear: new Date().getFullYear(),
    post: editorContent,
    count: contentBody.length,
    title: titleBody,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    copyYear: new Date().getFullYear(),
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    copyYear: new Date().getFullYear(),
  });
});

app.get("/compose", (req, res) => {
  res.render("compose", {
    copyYear: new Date().getFullYear(),
  });
});

app.post("/submit", (req, res) => {
  contentBody = req.body.content;
  editorContent.push(contentBody);
  titleBody.push(req.body.title);
  res.redirect("/compose");
});
app.get("/:dynamicTitle", (req, res) => {
  const dynamicTitle = req.params.dynamicTitle;
  if (titleBody.includes(dynamicTitle)) {
    const titleIndex = titleBody.indexOf(dynamicTitle);
    res.render("dynamicPage", {
      dynamicT: dynamicTitle,
      post: editorContent[titleIndex],
      copyYear: new Date().getFullYear(),
    });
  } else {
    res.status(404).send("Page not found");
  }
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
