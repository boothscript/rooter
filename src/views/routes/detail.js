const mapLayout = require("./mapLayout");

module.exports = ({ trip, route, mapView, messages = [] }) => {
  const waypoints = [];
  trip.waypoints.forEach(waypoint => {
    let txt;
    if (waypoint.site.postcode) {
      txt = waypoint.site.postcode;
    } else {
      txt = waypoint.site.name;
    }
    waypoints.push({
      index: waypoint.waypoint_index,
      html: `<p id="${waypoint.site.id ||
        "home"}" class="panel-block waypoint">${txt}</p>`
    });
  });

  waypoints.sort((a, b) => {
    return a.index > b.index ? 1 : -1;
  });
  console.log(waypoints);
  const convertTime = time => {
    const totalmins = time / 60;
    const hours = Math.floor(totalmins / 60);
    const mins = Math.floor((totalmins / 60 - hours) * 60);
    return `<p class="level-item has-text-centered"><strong class="is-size-5">${hours}</strong>h&nbsp<strong class="is-size-5">${mins}</strong>m</p>`;
  };
  const convertDistance = distance => {
    return `<p class="level-item has-text-centered"><strong class="is-size-5">${(
      distance / 1609
    ).toFixed(1)}</strong>miles</p>`;
  };

  const main = `
        <div class="columns">
          <div class="column is-two-thirds">
            <div id="route-map"></div>
          </div>
          <div class="column">

            <div class="panel is-primary">
              <p class="panel-heading">${route.name}</p>
              
              ${waypoints.map(waypoint => waypoint.html).join("")}
              <div class="panel-block panel-level">
                    ${convertTime(trip.trips[0].duration)} 
                    ${convertDistance(trip.trips[0].distance)}
              </div>
            </div>
          </div>
        </div>
    
    `;

  // can add js in script tag beofre it goes to mapLayout instead of ending route (must run after everythong else has loaded)
  return mapLayout(main, trip, mapView, messages);
};
