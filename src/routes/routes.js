const express = require("express");

const routesRepo = require("../Repos/routes");
const indexTemplate = require("../views/routes/index");
const detailTemplate = require("../views/routes/detail");
const router = express.Router();

router.post("/routes/add", async (req, res) => {
  await routesRepo.create({
    name: req.body.routeName,
    sites: req.body.siteList,
    date: new Date()
  });
  res.redirect("/routes");
});

router.get("/routes", async (req, res) => {
  const routes = await routesRepo.getAll();
  res.send(indexTemplate({ routes }));
});

router.get("/routes/:id/detail", async (req, res) => {
  res.send(detailTemplate({}));
});

module.exports = router;
