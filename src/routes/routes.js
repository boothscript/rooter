const express = require("express");
const fetch = require("node-fetch");

const routesRepo = require("../Repos/routes");
const sitesRepo = require("../Repos/sitesRepo");
const indexTemplate = require("../views/routes/index");
const detailTemplate = require("../views/routes/detail");
const mobileTemplate = require("../views/routes/mobile");

const { extractCoords } = require("./helperFunctions/routeFunctions");
const { getCoords } = require("./helperFunctions/siteDataProcessor");
const { getMapView } = require("../views/helpers");
const { adminAuth } = require("./helperFunctions/validatiors");
const router = express.Router();

router.post("/routes/add", [adminAuth], async (req, res) => {
  let start = {};
  let finish = {};
  try {
    start = {
      postcode: req.body.startPostcode,
      coords: await getCoords(req.body.startPostcode),
      icon: req.body.method === "car" ? "car-alt" : "walking"
    };
  } catch (err) {
    console.log("start postcode issue", err);
  }
  try {
    finish = {
      postcode: req.body.finishPostcode,
      coords: await getCoords(req.body.finishPostcode),
      icon: "flag-checkered"
    };
  } catch (err) {
    console.log("finish postcode issue", err);
  }

  route = await routesRepo.create({
    name: req.body.routeName,
    sites: req.body.siteList.split(","),
    start,
    finish,
    date: new Date(),
    method: req.body.method
  });
  await routesRepo.getTrip(route.id);
  res.redirect("/routes");
  console.log(await routesRepo.getOne(route.id));
});

router.get("/routes", [adminAuth], async (req, res) => {
  const routes = await routesRepo.getAll();
  res.send(indexTemplate({ routes }));
});

router.get("/routes/:id/detail", [adminAuth], async (req, res) => {
  const route = await routesRepo.getOne(req.params.id);

  const mapView = await getMapView(route);

  res.send(detailTemplate({ route, mapView }));
});

router.get("/routes/:id/mobile", [adminAuth], async (req, res) => {
  const route = await routesRepo.getOne(req.params.id);
  res.send(mobileTemplate({ route }));
});

router.get("/map", (req, res) => {
  res.send(detailTemplate({}));
});

router.post("/routes/:id/toggleCheck", [adminAuth], async (req, res) => {
  const route = await routesRepo.getOne(req.params.id);
  const targetWaypoint = route.waypoints.find(
    point => point.waypoint_index == req.query.waypoint
  );

  targetWaypoint.checked = !targetWaypoint.checked;
  await routesRepo.update(req.params.id, { waypoints: route.waypoints });

  res.redirect(`/routes/${req.params.id}/mobile`);
});
module.exports = router;
