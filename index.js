const express = require('express');
const app = express();
const { v4: uuid } = require('uuid');
const path = require('path');
const methodOverride = require('method-override');
const { render } = require('ejs');

let comments = [
    {
        id: uuid(),
        username: "Jhon",
        comment: "I have a dream and a hope it comes true"
    },
    {
        id: uuid(),
        username: "Doe",
        comment: "I wish that the sky up abova"
    }
];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
// app.set('view',path.join(__dirname,'views'));     


app.get('/comments', (req, res) => {
    //console.log({ comments })
    res.render(path.join(__dirname, 'views/comments.ejs'), { comments });
});
app.get('/comments/new', (req, res) => {
    res.render(path.join(__dirname, 'views/post.ejs'));
})

app.post('/comments', (req, res) => {
    //console.dir(req.body);
    const { username, comment } = req.body;
    //console.log({ username, comment })
    comments.push({ username, comment, id: uuid() });
    //console.log({ comments })
    res.redirect('/comments');
});

app.get('/comments/:id', (req,res)=>{
    let {id}=req.params;
    let text=comments.find(x => x.id==id);
    //console.log({text})
    res.render(path.join(__dirname, 'views/details.ejs'), {text});
})

app.get('/comments/:id/edit', (req,res)=>{
    let {id}=req.params;
    let text=comments.find(x => x.id==id);
    res.render(path.join(__dirname, 'views/edit.ejs'),{text});
})

app.patch('/comments/:id/edit', (req,res)=>{
    let {id}=req.params;
    let text=comments.find(x => x.id==id);
    let newcomment=req.body.newcomment;
    text.comment=newcomment;
    res.redirect('/comments');
})

app.delete('/comments/:id/delete', (req,res)=>{
    let {id}=req.params;
    comments=comments.filter(x=> x.id!==id)
    console.log({comments});
    res.redirect('/comments');

})

app.listen(3001, () => {
    console.log("ON PORT 3001!")
})