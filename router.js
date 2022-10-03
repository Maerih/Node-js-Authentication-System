var express = require("express")
var router = express.Router();

const credentials = {
    email: "admin@admin.com",
    password: "admin123"
}

router.post('/login', (req,res) => {
    if(req.body.email == credentials.email && req.body.password == credentials.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end('login success...!)
    }else {
        res.end("invalid Username")
    }
})

router.get('/dashboard', (req,res) => {
    if(req.session.user){
        res.render('dashboard', {user: req.session.user})
    }else{
        res.send("unauthorized User")
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
            res.send("error")
        }else{
            res.render('base', {title:"express", logout:"logout sucess..."})
        }
    })
})
module.exports = router;