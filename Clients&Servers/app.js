const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoutes')


const { result } = require('lodash');
// express app 
const app = express();

// connect tp mongoDB 
const dbURI = 'mongodb+srv://alma:alma123@nodecrash.yoys1.mongodb.net/nodecrash?retryWrites=true&w=majority&appName=nodecrash';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


// register view engine 
app.set('view engine', 'ejs');
//listen to request

// static files 
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog ({
//         title: 'new blog 2',
//         snippet: 'About my new blog',
//         body:'more about my blog'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result);   
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('67c4c1c01c05b896fa25f5bb')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// routes 

app.get('/', (req, res) => {
    res.redirect('./blogs');
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.use('/blogs', blogRouter);

// 404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})