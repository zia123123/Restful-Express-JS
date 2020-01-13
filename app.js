const express = require('express');

const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

var logger = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//config cors
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//set path
var path = require('path');

app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//mendefinisasikan route / model
const articleRoutes = require('./routes/articles');

//memanggil router
app.use('/articles', articleRoutes);



//ROUTES
app.get('/', ( req, res) => {
    res.send('we are on home');
});
//
app.get('/inputArticle', (req, res) =>{
  res.render('input');
});

//connect to database
// mongoose.connect(process.env.DB_CONNECTION,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () =>
// console.log('connect to database')
// );
try{
mongoose.connect('mongodb+srv://zia:zia@cluster0-jqwu6.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology:true
});
}catch(err){
    console.log(err);
}


app.listen('1000');


