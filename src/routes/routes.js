const express = require("express");
const fetch = require("node-fetch");

const routesRepo = require("../Repos/routes");
const sitesRepo = require("../Repos/sitesRepo");
const indexTemplate = require("../views/routes/index");
const detailTemplate = require("../views/routes/detail");

const { extractCoords } = require("./helperFunctions/routeFunctions");
const { getCoords } = require("./helperFunctions/siteDataProcessor");
const { getMapView } = require("../views/helpers");
const router = express.Router();

router.post("/routes/add", async (req, res) => {
  const start = {
    postcode: req.body.startPostcode,
    coords: await getCoords(req.body.startPostcode),
    icon: "car-alt"
  };
  const finish = {
    postcode: req.body.finishPostcode,
    coords: await getCoords(req.body.finishPostcode),
    icon: "flag-checkered"
  };
  route = await routesRepo.create({
    name: req.body.routeName,
    sites: req.body.siteList.split(","),
    start,
    finish,
    date: new Date()
  });
  await routesRepo.getTrip(route.id);
  res.redirect("/routes");
  console.log(await routesRepo.getOne(route.id));
});

router.get("/routes", async (req, res) => {
  const routes = await routesRepo.getAll();
  res.send(indexTemplate({ routes }));
});

router.get("/routes/:id/detail", async (req, res) => {
  const route = await routesRepo.getOne(req.params.id);

  const mapView = await getMapView(route);

  res.send(detailTemplate({ route, mapView }));
});

router.get("/map", (req, res) => {
  res.send(detailTemplate({}));
});
module.exports = router;
