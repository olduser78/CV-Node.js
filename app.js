var express = require('express');
var app = express();
const { render } = require('ejs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const fs = require('fs')

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(express.static('public/assets'));
app.use(express.static('public'));

transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "ar0280761@gmail.com",
        pass: "Alex1977!#"
    }
});

var data = fs.readFileSync('cv.json', 'utf8');
var json = JSON.parse(data);
const cv = json;


// index page
app.get('/', function(req, res) {
    res.render('index', {cv: cv});
    
});


app.post('/sent', function(req, res) {
    message = {
        from: req.body.email,
        to: 'alrebenciuc@gmail.com',
        subject: req.body.subject,
        text: req.body.message
    }
    transporter.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log("Message sent!");
            res.render('sent');
        }
    });
    
    
});

app.listen(3000);
console.log('Server is listening on port 3000');


