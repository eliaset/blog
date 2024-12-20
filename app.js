import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    copyYear: new Date().getFullYear(),
    posts: posts,
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
  const post = {
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(post);
  res.redirect("/compose");
});
app.get("/:dynamicTitle", (req, res) => {
  const dynamicTitle = req.params.dynamicTitle;
  const title = posts.map((post) => post.title);
  if (title.includes(dynamicTitle)) {
    const titleIndex = title.indexOf(dynamicTitle);
    res.render("dynamicPage", {
      dynamicT: dynamicTitle,
      post: posts[titleIndex].content,
      copyYear: new Date().getFullYear(),
    });
  } else {
    res.status(404).send("Page not found");
  }
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
