require('dotenv').config();
const express = require('express'),
      mongoose = require('mongoose'),
      User = require('./models/User');
const { findByIdAndDelete, findByIdAndUpdate } = require('./models/User');


const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.DB_CONNECT, () => console.log("you dey connected.."));


app.get('/', async (req, res) => {
    const users = await User.find();
    res.render('index', { users });
})

app.get('/admin', async (req, res) => {
    const users = await User.find();
    res.render('admin', { users });
})

app.get('/post', (req, res) => {
    res.render('post');
})

app.post('/submit', (req, res) => {
    const firstname = req.body.firstname,
          lastname = req.body.lastname
    
    new User({
        first_name: firstname,
        last_name: lastname
    }).save().then((newUser) => {
        console.log("new user created");
        res.redirect('/');
    });
})
// approve users
app.post('/approve/:id', async (req, res) => {
    const id = req.params.id;
    await User.findById(id);
    try{
        await User.findByIdAndUpdate(id, { Status: 1 })
        res.redirect('/admin');
    } catch (err) {
        return console.log(err);
    }
   
})

// dis approve user
app.post('/reject/:id', async (req, res) => {
    const id = req.params.id;
    await User.findById(id);
    try{
        await User.findByIdAndUpdate(id, { Status: 0 })
        res.redirect('/admin');
    } catch (err) {
        return console.log(err);
    }
  
})

app.listen(PORT, () => {
    console.log("listening on PORT 3000")
})