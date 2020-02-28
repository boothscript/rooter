const fetch = require("node-fetch");
const Repo = require("./repo");
const sitesRepo = require("./sitesRepo");

class routesRepo extends Repo {
  // METHODS
  // fetch trip
  // fetch routes
  //
  //;
  async getTrip(routeId) {
    const route = await this.getOne(routeId);

    // gather coords for api call
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
        Object.assign(site, { icon: "map-marker" });
        siteList.push(site);
        if (site.coords) {
          return `${site.coords.longitude},${site.coords.latitude}`;
        }
      })
    );
    siteList.push(route.finish);

    // call trip api
    const tripData = await fetch(
      `http://nginx:80/trip/v1/driving/${startCoords};${siteCoordsList.join(
        ";"
      )};${finishCoords}?source=first&destination=last&steps=true&geometries=geojson&annotations=true`
    )
      .then(response => response.json())
      .catch(err => {
        console.log("error with api");
        console.log(err);
      });

    //   create waypoint object
    console.log(tripData);
    console.log("waypoints", tripData.waypoints);
    const waypoints = tripData.waypoints.map((waypoint, index) => {
      return {
        siteId: siteList[index].id || this.randomId(),
        name: siteList[index].name || siteList[index].postcode,
        postcode: siteList[index].postcode || siteList[index].address.postcode,
        location: waypoint.location,
        waypoint_index: waypoint.waypoint_index,
        icon: siteList[index].icon,
        checked: false
      };
    });
    const routeData = tripData.trips[0];

    const { duration, distance } = tripData.trips[0];

    await this.update(route.id, { waypoints, duration, distance, routeData });
  }
}

module.exports = new routesRepo("data/routes.json");
