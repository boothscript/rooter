const express = require("express");

const sitesRepo = require("../Repos/sitesRepo");

const indexTemplate = require("../views/sites/index.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const sitesData = await sitesRepo.getAll();
  res.send(indexTemplate({ sitesData }));
});

module.exports = router;
