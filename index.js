import express from "express";
import bodyParser from "body-parser";
import { title } from "process";


const app = express();
const port = 3000;
var posts=[];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res)=>{
    res.render("index.ejs",{
        posts:posts,
    })
})

app.get("/new",(req,res)=>{
    res.render("new.ejs");
})


app.post("/new",(req,res)=>{
    const newPost = {
        id : Date.now(),
        title : req.body.title,
        content : req.body.content, 
    }
    posts.push(newPost);
    res.redirect("/");
});


app.get("/edit/:id",(req,res)=>{
    const post = posts.find(p=>p.id==req.params.id);
    res.render("edit.ejs",{
        post:post,
    })
})

app.post("/edit/:id",(req,res)=>{
    const post = posts.find(p=>p.id==req.params.id);
    post.title=req.body.title;
    post.content=req.body.content;
    res.redirect("/");
});


app.post("/delet/:id",(req,res)=>{
    posts=posts.filter(p=>p.id!=req.params.id);
    res.redirect("/");
});


app.listen(port,(req, res)=>{
    console.log(`Listening to port ${port}`);
})