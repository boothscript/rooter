const express = require("express");

const routesRepo = require("../Repos/routes");
const indexTemplate = require("../views/routes/index");
const detailTemplate = require("../views/routes/detail");

const { getCoords } = require("./helperFunctions/siteDataProcessor");
const router = express.Router();

router.post("/routes/add", async (req, res) => {
  const start = {
    postcode: req.body.startPostcode,
    coords: await getCoords(req.body.startPostcode)
  };
  const finish = {
    postcode: req.body.finishPostcode,
    coords: await getCoords(req.body.finishPostcode)
  };
  await routesRepo.create({
    name: req.body.routeName,
    sites: req.body.siteList.split(","),
    start,
    finish,
    date: new Date()
  });
  res.redirect("/routes");
});

router.get("/routes", async (req, res) => {
  const routes = await routesRepo.getAll();
  res.send(indexTemplate({ routes }));
});

router.get("/routes/:id/detail", async (req, res) => {
  const route = await routesRepo.getOne(req.params.id);
  console.log(route);
  res.send(await detailTemplate({ route }));
});

router.get("/map", (req, res) => {
  res.send(detailTemplate({}));
});
module.exports = router;
