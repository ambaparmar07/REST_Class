const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "amba",
        content: "I love codinng!"
    },
    {
        id: uuidv4(),
        username: "vai",
        content: "Gm!"
    },
    {
        id: uuidv4(),
        username: "ap",
        content: "hello"
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    //console.log(req.body);
    let { username, content} = req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    //res.send("post requests working");
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    //console.log(post)
    res.render("show.ejs" , {post});
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    post.content = newContent;
    console.log(post);
    //console.log(newContent);
    //console.log(id);
    res.send("patch request working");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("listening to port : 8080");
});