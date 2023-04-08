//CONST DECLARATION
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { render } = require('ejs');
const mongoose = require('mongoose');
const Comment = require('./models/comment')

//CONNECTING DATABASE
console.log(main());
async function main() {
    await mongoose.connect('mongodb+srv://him:himanshu@cluster0.yfpx5hl.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log("DATABASE CONNECTED!!!")
        })
        .catch(err => {
            console.log("ERROR!!!! DATABASE IS NOT CONNECTED")
            console.log(err)
        })
}

//.USE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//.SET  
app.set('view engine', 'ejs');

//INDEX
app.get('/comments', async (req, res) => {
    const comments = await Comment.find({});
    //console.log({ comments });
    res.render(path.join(__dirname, 'views/comments.ejs'), { comments });
});

//POST
app.get('/comments/new', (req, res) => {
    res.render(path.join(__dirname, 'views/post.ejs'));
})

app.post('/comments', async (req, res) => {
    console.dir(req.body);
    const newcomment = new Comment(req.body);
    await newcomment.save();
    res.redirect('/comments');
});

//DETAILS    
app.get('/comments/:id', async (req, res) => {
    let { id } = req.params;
    const text = await Comment.findById(id);
    //console.log({ text });
    res.render(path.join(__dirname, 'views/details.ejs'), { text });
})

//EDIT
app.get('/comments/:id/edit', async (req, res) => {
    let { id } = req.params;
    let text = await Comment.findById(id);
    res.render(path.join(__dirname, 'views/edit.ejs'), { text });
})

app.patch('/comments/:id/edit',async (req,res)=>{
    let {id}=req.params;
    //console.log(req.body);
    let text=await Comment.findByIdAndUpdate(id,req.body,{new:true});
    text.save();
    //console.log({text});
    res.redirect('/comments');
})

//DELETE
app.delete('/comments/:id/delete', async (req,res)=>{
    let {id}=req.params;
    let text=await Comment.findByIdAndDelete(id,{new:true});
    console.log({text});
    res.redirect('/comments');
})

app.listen(3001, () => {
    console.log("ON PORT 3001!")
})
