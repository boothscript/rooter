const express = require("express");
const fetch = require("node-fetch");

const routesRepo = require("../Repos/routes");
const sitesRepo = require("../Repos/sitesRepo");
const indexTemplate = require("../views/routes/index");
const detailTemplate = require("../views/routes/detail");

const { getCoords } = require("./helperFunctions/siteDataProcessor");
const { getMapView } = require("../views/helpers");
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

  // get siteList from route
  const startCoords = [
    route.start.coords.longitude,
    route.start.coords.latitude
  ];
  const finishCoords = [
    route.finish.coords.longitude,
    route.finish.coords.latitude
  ];
  const siteList = [route.start];
  const siteCoordsList = await Promise.all(
    route.sites.map(async siteId => {
      const site = await sitesRepo.getOne(siteId);
      siteList.push(site);
      if (site.coords) {
        return `${site.coords.longitude},${site.coords.latitude}`;
      }
    })
  );
  siteList.push(route.finish);
  siteList.forEach(site => {
    console.log(site.name || site.postcode);
  });
  const mapView = await getMapView(route);

  // generate routing data with fetch
  const trip = await calculateTrip(startCoords, finishCoords, siteCoordsList);

  // add site objects to trip data
  trip.waypoints.forEach((waypoint, index) => {
    Object.assign(waypoint, { site: siteList[index] });
  });

  // generate map js
  // generate html (in detail template)

  res.send(detailTemplate({ trip, route, mapView }));
});

router.get("/map", (req, res) => {
  res.send(detailTemplate({}));
});
module.exports = router;

const calculateTrip = (start, finish, siteList) => {
  return fetch(
    `http://127.0.0.1:5000/trip/v1/driving/${start};${siteList.join(
      ";"
    )};${finish}?source=first&destination=last&steps=true&geometries=geojson&annotations=true`
  ).then(response => response.json());
};

// const calculateTrip = (start, finish, siteList) => {
//   fetch(
//     `http://127.0.0.1:5000/trip/v1/driving/${start};${siteList.join(
//       ";"
//     )};${finish}?source=first&destination=last&steps=true&geometries=geojson&annotations=true`
//   )
//     .then(response => response.json())
//     .then(jsonData => {
//       console.log(jsonData);
//       L.geoJSON(Object.assign(jsonData.trips[0], { type: "Feature" })).addTo(
//         routeMap
//       );
//       jsonData.waypoints.forEach(waypoint => {
//         const marker = L.marker([
//           waypoint.location[1],
//           waypoint.location[0]
//         ]).addTo(routeMap);
//         marker.bindPopup(waypoint.name);
//       });
//     });
// };

// async getCoordList(route) {
//     return await Promise.all(
//       route.sites.map(async siteId => {
//         const site = await sitesRepo.getOne(siteId);
//         if (site.coords) {
//           return `[${site.coords.longitude}, ${site.coords.latitude}]`;
//         }
//       })
//     );
//   },
//   getStartCoords(route) {
//     return [route.start.coords.longitude, route.start.coords.latitude];
//   },
//   getFinishCoords(route) {
//     return [route.finish.coords.longitude, route.finish.coords.latitude];
//   },
