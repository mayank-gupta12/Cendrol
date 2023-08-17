var express = require('express');
var router = express.Router();

const user = require("../model/taskModel");

router.get('/', function (req, res, next) {
  res.render('signup', { title: 'signup' });
});

router.post('/signup', function (req, res, next) {
  // res.json(req.body);

  user.create((req.body))
    .then((createdUser) => {
      res.redirect("/signin");
    })
    .catch((err) => res.send(err));
});

router.get('/signin', function (req, res, next) {
  res.render('signin', { title: 'signin' });
});


router.post('/signin', function (req, res, next) {
  const { username, password } = req.body;
  user.findOne({ username })
    .then((founduser) => {
      if (!founduser) {
        return res.send("user not found <a href='/signin'>back</a>")
      };

      if (password !== founduser.password) {
        return res.send("invaild user <a href='/signin'>back</a>")
      };

      res.redirect("/profile/" + founduser.username);

    })
    .catch((err) => res.send(err));

  // res.render('signin', { title: 'signin' });
});

router.get('/profile/:username', function (req, res, next) {
  user.find()
    .then((users) =>
      res.render('profile', { title: req.params.username, users })
    )
    .catch((err) =>
      res.send(err)
    );
});

router.get('/logout', function (req, res, next) {
  res.redirect('/');
});



module.exports = router;
