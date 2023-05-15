const express = require('express');
const session = require('express-session');
const FileUpload = require('express-fileupload')
const { json } = require('sequelize');
const mysql = require('mysql');
const app = express();
const cors = require('cors')
const multer = require('multer')
const cookieParser = require('cookie-parser');

const port = 3069;

var admin = '';

const dotenv = require('dotenv');
const passport = require('passport');
const db = require('./config/database');


try {
	db.authenticate();
	console.log("succses")
	db.sync();
} catch (error) {
	console.log(error);
}

dotenv.config()

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'r_perumahan'
});

app.use(cookieParser());
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true
}))

app.use(express.static("public"));

app.use(express.json());

app.use('/berita', require('./routes/berita'));
app.use('/warga', require('./routes/user'));
app.use('/transaksi', require('./routes/pembayaran'));
app.use('/auth', require('./routes/auth'));

app.use(FileUpload());
app.use(express.urlencoded({ extended: true }))
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	cookie: {
		httpOnly: true
	}
}));

app.post('/auth', function (request, response) {
	admin = request.body.username;
	response.end();

});

app.get('/alogin', (req, res) => {
	connection.query('SELECT * FROM admin', function (err, results) {
		if (err) throw err;
		res.json(results);
	})
});

app.set('view engine', 'ejs')
app.use(passport.initialize())
app.use(passport.session())
require('./config/Passport')

app.use((req, res, next) => {
	res.locals.user = req.user
	next()
});

app.listen(port, () => {
	console.log('Server is running on port ' + port);
});