const mapLayout = require("./mapLayout");
const { convertDistance, convertTime } = require("../helpers");

module.exports = ({ route, mapView, messages = [] }) => {
  // create route pannel
  const sortedWaypoints = route.waypoints.sort((a, b) => {
    return a.waypoint_index > b.waypoint_index ? 1 : -1;
  });
  console.log(sortedWaypoints);
  const waypointsHTML = [];
  sortedWaypoints.forEach(waypoint => {
    waypointsHTML.push(`<p id="${waypoint.siteId}" class="panel-block waypoint"><span class="panel-icon">
        <i class="fas fa-${waypoint.icon}"></i></span>${waypoint.name}</p>`);
  });

  // route pannel footer calculations
  const { hours, mins } = convertTime(route.duration);
  const { miles } = convertDistance(route.distance);
  const totalTime = `<p class="level-item has-text-centered"><strong class="is-size-5">${hours}</strong>h&nbsp<strong class="is-size-5">${mins}</strong>m</p>`;
  const totalDistance = `<p class="level-item has-text-centered"><strong class="is-size-5">${miles}</strong>miles</p>`;

  const main = `
        <div class="columns">
          <div class="column is-two-thirds">
            <div id="route-map"></div>
          </div>
          <div class="column">
            <div class="panel is-primary">
              <p class="panel-heading">${route.name}</p>
              ${waypointsHTML.join("")}
              <div class="panel-block panel-level">
                ${totalTime}
                ${totalDistance}
              </div>
            </div>
          </div>
        </div>
    
    `;

  // can add js in script tag beofre it goes to mapLayout instead of ending route (must run after everythong else has loaded)
  return mapLayout(main, route, mapView, messages);
};
