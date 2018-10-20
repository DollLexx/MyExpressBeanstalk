var express = require('express');
var hbs = require('hbs');
var port = process.env.PORT || 3000;

var app = express(),
//this makes the public folder accessible
path = require('path'),
publicDir = path.join(__dirname,'public');

app.use(express.static(publicDir))
app.set('view engine', 'hbs');
app.set('views', publicDir + '/views');

//this is how to setup a route in the app
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Deb\'s application',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {

    res.send({
        errorMessage: 'This is really bad'
    });
});


app.listen(port, () => {
    console.log("Server is listening on port " + port.toString());
});
module.exports = app;
