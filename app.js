const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");
const fs = require("fs");

//connect mongoose 
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactDance');

    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

//mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    myConcern: String
});

const Contact = mongoose.model('Contact', contactSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params)
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params)
})

app.post('/contact', (req, res) => {

    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.status(200).render('demo.pug');
    }).catch(() => {
        res.status(400).send("item was not saved to the databse")

    });

    

})




// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});