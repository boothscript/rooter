const mobileLayout = require("./mobileLayout");
const { convertDistance, convertTime } = require("../helpers");

module.exports = ({ route }) => {
  // route pannel footer calculations
  const { hours, mins } = convertTime(route.duration);
  const { miles } = convertDistance(route.distance);
  const totalTime = `<p class="level-item has-text-centered"><strong class="is-size-5">${hours}</strong>h&nbsp<strong class="is-size-5">${mins}</strong>m</p>`;
  const totalDistance = `<p class="level-item has-text-centered"><strong class="is-size-5">${miles}</strong>miles</p>`;

  // create route pannel
  const sortedWaypoints = route.waypoints.sort((a, b) => {
    return a.waypoint_index > b.waypoint_index ? 1 : -1;
  });
  console.log(sortedWaypoints);
  const waypointsHTML = [];
  sortedWaypoints.forEach(waypoint => {
    waypointsHTML.push(`<div id="${waypoint.siteId}" class="panel-block waypoint is-flex"><span class="panel-icon">
        <i class="fas fa-${waypoint.icon}"></i></span>${waypoint.name}<button class="waypoint-button button is-small modal-button" id="add-comment" data-route="${route.id}">Add Comment</button><button class="button is-dark is-small"><i class="fas fa-directions"></i>
        </button><button class="waypoint-buttons button is-small is-primary"><i class="fas fa-check"></i></button></div>`);
  });

  main = `
  <div class="panel is-primary">
    <p class="panel-heading">${route.name}<a href="/routes/${
    route.id
  }/detail" class="pannel-mobile-link"><i class="fas fa-map"></i></a></p>
    ${waypointsHTML.join("")}
    <div class="panel-block panel-level">
        ${totalTime}
        ${totalDistance}
    </div>
  </div>
  <div class="modal" id="add-comment-modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Add Collection Comment</p>
        </header>
        <section class="modal-card-body">
            <form method="POST" action="">
                <div class="field">
                    <label class="label">Comment</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Add comment here" name="comment"></textarea>
                        <p class="help is-danger"></p>
                    </div>
                </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button cancel">Cancel</button>
            <button class="button is-primary">Save</button>
            </form>
        </footer>
    </div>
  </div>
    `;

  return mobileLayout(main);
};
