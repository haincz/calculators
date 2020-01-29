const express = require("express");
const app = express();
const exphbs  = require('express-handlebars');
const router = require("./router");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const articleRouter = require("./articleRouter")
const articles = require("./articles/articles.js")



mongoose.connect('mongodb://YOURDB:YOURPASS', { useNewUrlParser: true,useUnifiedTopology: true }, ).then(() => {
	console.log("Connected to Database");
}).catch((err) => {
	console.log("Not Connected to Database ERROR! ", err);
});


app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: false }));

let oneDay = 86400000; // in milliseconds

app.use(express.static(path.join(__dirname, 'public'), {
  maxage: oneDay
}))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('trust proxy', true);
app.use(wwwRedirect);
app.use(urlEndRredirect);
app.use("/articles", articleRouter)
app.use(router);

function urlEndRredirect (req, res, next) {

    if (req.originalUrl === "/articles") {
      return res.redirect(301, "/articles/")
    }    
    next()

}


function wwwRedirect(req, res, next) {
    if (req.headers.host.slice(0, 4) === 'www.') {
        var newHost = req.headers.host.slice(4);
        return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
    }
    next();
};




app.get('/', function (req, res) {

  articles.getList().then((data) => {

    if (data.length === 0){
        res.status(404)
    } 

    res.render('home', {
        article_list: data,
        categoryTitle: "Najnowsze artykuły"
    })

  })
  
});


app.get('/kontakt', (req, res) => {

  res.render('contact')

})

app.listen(process.env.PORT || 8080);