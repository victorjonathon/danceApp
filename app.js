const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const PORT = 3000;

mongoose.connect('mongodb://localhost/danceApp', {useNewUrlParser: true, useUnifiedTopology: true});
const dbCon = mongoose.connection; 
dbCon.on('error', console.error.bind(console, 'MongoDB connection error:'));

let contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

let Contact = mongoose.model('Contact', contactSchema);


app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    let params = {};
    res.status(200).render('index', params);
});
app.get('/contactUs', (req, res)=>{
    let params = {};
    res.status(200).render('contact', params);
});
app.post('/contactUs', (req, res)=>{
    let formData = new Contact(req.body);
    
    formData.save().then(() => {
        res.status(200).send('Data saved!');
    }).catch(() => {
        res.status(400).send('Oops! Some error occurred.');
    });
});

app.listen(PORT, ()=>{
    console.log(`Express running on port ${PORT}`);
});