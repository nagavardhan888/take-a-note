const express = require('express')
const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const Note = require("./models/note")
const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/notesdb').
then(()=>{
    console.log("mongo connected")
}).
catch((err)=>{
    console.log("error occured")
})
app.get("/",async (req,res)=>{
    const notes = await Note.find({})
    res.render("index",{notes:notes})
})
app.get("/create",(req,res)=>{
    res.render("create")
})
app.post("/create",async(req,res)=>{
    const {title,content}=req.body
    const newNote=new Note({
        title:title,
        content:content
    })
    await newNote.save()
    res.redirect("/")
})
app.get("/edit/:id",async (req,res)=>{
    const id = req.params.id
    console.log(id)
    const note = await Note.findById(id)
     console.log(id)
    res.render("edit.ejs",{note})
})
app.post("/update/:id",async(req,res)=>{
    const id = req.params.id;
     const {title,content}=req.body
    await Note.findByIdAndUpdate(id,{
        title:title,
        content:content,
    })
    res.redirect("/")
})

app.get("/delete",async(req,res)=>{
    const id = req.query.id
    console.log(id) 
   await  Note.findByIdAndDelete(id)
    console.log(id)
    res.redirect("/")
})
app.listen(3000,()=>{
    console.log("running ar port :3000")
})