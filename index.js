const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

//mongodb Connection
mongoose.connect('mongodb://127.0.0.1:27017',{
    
}).then(()=> {
    console.log('database connected');
})

global.loggedIn = null

//controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')


// middleware
const redirectIfAuth = require('./middleware/redirectifAuth')
const authMiddleware = require('./middleware/authMiddleware')


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*" , (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine', 'ejs')


//กำหนด rote 
app.get('/', indexController)
app.get('/home', authMiddleware, homeController)
app.get('/login', redirectIfAuth, loginController)
app.get('/register', redirectIfAuth, registerController)
app.post('/user/register', redirectIfAuth, storeUserController)
app.post('/user/login', redirectIfAuth, loginUserController)
app.get('/logout', logoutController)



app.listen(4000, () =>{
    console.log("App listening no port 4000");
})