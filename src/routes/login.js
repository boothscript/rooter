const express = require("express");

const { validationResult } = require("express-validator");
const loginTemplate = require("../views/auth/login");
const userRepo = require("../Repos/users");
const {
  emailIsUser,
  passwordCorrect
} = require("./helperFunctions/validatiors");
const router = express.Router();

router.get("/login", (req, res) => {
  if (req.session.userId) {
    res.redirect("/");
  } else {
    res.send(loginTemplate({}));
  }
});

router.post("/login", [emailIsUser, passwordCorrect], async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    res.send(loginTemplate({ errors }));
  } else {
    const user = await userRepo.getOneBy({ email: req.body.email });
    if (user) {
      req.session.userId = user.id;
      res.redirect("/");
    }
  }
});

module.exports = router;
