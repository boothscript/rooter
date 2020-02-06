const express = require("express");

const routesRepo = require("../Repos/routes");

const router = express.Router();

router.post("/routes/add", async (req, res) => {
  await routesRepo.create({
    name: req.body.routeName,
    sites: req.body.siteList,
    date: new Date()
  });
  res.send("done");
});

module.exports = router;
